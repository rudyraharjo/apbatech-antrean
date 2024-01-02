import pool from '../../config/dbConnect';

const POLI_MAPPING: any = {
    '001': 'POLI KANDUNGAN',
    '002': 'POLI GIGI'
};

function getNamaPoliByKode(kodePoli: string): string | null {
    return POLI_MAPPING[kodePoli] || null;
}

export class AntrianRepository {
    static POLI_MAPPING: any;

    static async findByKodePoliAndTgl(kodepoli: string, tglperiksa: string): Promise<any | null> {
        const rows: any = await pool.query(`
        select
            a.namapoli,
            (
                select
                    count(*)
                from
                    antrian b
                where
                    b.kodepoli = a.kodepoli
                    and b.tglpriksa = a.tglpriksa 
            ) 'totalantrean',
            (
                select
                    count(*)
                from
                    antrian c
                where
                    c.kodepoli = a.kodepoli
                    and c.tglpriksa = a.tglpriksa 
                    and c.statusdipanggil = 0
            ) 'sisaantrian',
            CONCAT(
                (SELECT MIN(d.nomorantrean)
                FROM antrian d
                WHERE d.kodepoli = a.kodepoli AND d.tglpriksa = a.tglpriksa AND d.statusdipanggil = 0),
                '',
                (SELECT MIN(d.angkaantrean)
                FROM antrian d
                WHERE d.kodepoli = a.kodepoli AND d.tglpriksa = a.tglpriksa AND d.statusdipanggil = 0)
            ) AS 'antreanpanggil'
        from
            antrian a
        where
            a.kodepoli = ?
            and a.tglpriksa = ?
            group by 1,2,3,4
        `, [kodepoli, tglperiksa]);
        return rows.length ? rows[0] : null;
    }

    static async storeAntrian(data: any): Promise<any | null> {
        const { nomorkartu, nik, kodepoli, tanggalperiksa, keluhan } = data;

        const nomorantrean = 'A2'
        const lastAngkaAntrean = await this.getLastAngkaAntreanByNomorAntrean(nomorantrean);
        const newAngkaAntrean = lastAngkaAntrean ? lastAngkaAntrean + 1 : 1;
        const newNorm = await this.getLastNorm();

        const namaPoli = getNamaPoliByKode(kodepoli);
        if (!namaPoli) {
            throw new Error('Kode poli tidak valid');
        }

        const rows: any = await pool.query(`
            INSERT INTO antrian (nomorantrean, angkaantrean, norm, nomorkartu, nik, namapoli, kodepoli, tglpriksa, keluhan, statusdipanggil)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [nomorantrean, newAngkaAntrean, newNorm, nomorkartu, nik, namaPoli, kodepoli, tanggalperiksa, keluhan, 0]);

        console.log("insertId ", rows[0].insertId);

        const res: any = await pool.query(`
            select
                a.nomorantrean,
                a.angkaantrean,
                a.namapoli,
                (
                    select
                        count(*)
                    from
                        antrian c
                    where
                        c.kodepoli = a.kodepoli
                        and c.tglpriksa = a.tglpriksa 
                        and c.statusdipanggil = 0
                ) 'sisaantrian',
                CONCAT(
                    (SELECT d.nomorantrean
                     FROM antrian d
                     WHERE d.kodepoli = a.kodepoli AND d.tglpriksa = a.tglpriksa AND d.statusdipanggil = 0 and d.nomorantrean = a.nomorantrean and d.angkaantrean = a.angkaantrean),
                    '_',
                    (SELECT d.angkaantrean
                     FROM antrian d
                     WHERE d.kodepoli = a.kodepoli AND d.tglpriksa = a.tglpriksa AND d.statusdipanggil = 0 and d.nomorantrean = a.nomorantrean and d.angkaantrean = a.angkaantrean)
                ) AS 'antreanpanggil'
            from
                antrian a
            where
                a.id = ? 
        `, [rows[0].insertId]);

        return res.length ? res[0][0] : null;
    }

    static async findByNoKartuKodePoliAndTgl(nomorkartu_jkn: string, kodepoli: string, tglperiksa: string): Promise<any | null> {
        const rows: any = await pool.query(`
        select
            a.nomorantrean
            , a.namapoli 
            , (
                select
                    count(*)
                from
                    antrian c
                where
                    c.nomorkartu = a.nomorkartu  
                    and c.nomorantrean = a.nomorantrean 
                    and c.kodepoli = a.kodepoli
                    and c.tglpriksa = a.tglpriksa 
                    and c.statusdipanggil = 0
            ) 'sisaantrian',
            CONCAT(
                (SELECT d.nomorantrean
                FROM antrian d
                WHERE 
                    d.kodepoli = a.kodepoli AND 
                    d.tglpriksa = a.tglpriksa AND 
                    d.nomorkartu = a.nomorkartu and 
                    d.statusdipanggil = 0 and 
                    d.nomorantrean = a.nomorantrean and 
                    d.angkaantrean = a.angkaantrean
                ),
                '_',
                (SELECT d.angkaantrean
                FROM antrian d
                WHERE 
                    d.kodepoli = a.kodepoli AND 
                    d.tglpriksa = a.tglpriksa and 
                    d.nomorkartu = a.nomorkartu and
                    d.statusdipanggil = 0 AND 
                    d.nomorantrean = a.nomorantrean and  
                    d.angkaantrean = a.angkaantrean
                )
            ) AS 'antreanpanggil'
        from
            antrian a
        where
            a.nomorkartu = ?
            and a.kodepoli = ?
            and a.tglpriksa = ?
        group by
            1,
            2,
            3,
            4
        `, [nomorkartu_jkn, kodepoli, tglperiksa]);
        return rows.length ? rows[0] : null;
    }

    static async updateCancelAntrian(nomorkartu: string, kodepoli: string, tanggalperiksa: string): Promise<any> {
        const result: any = await pool.query(`
            UPDATE antrian 
            SET statusdipanggil = 3 
            WHERE nomorkartu = ? AND kodepoli = ? AND tglpriksa = ? and statusdipanggil = 0
        `, [nomorkartu, kodepoli, tanggalperiksa]);

        return result
    }


    static async getLastAngkaAntreanByNomorAntrean(nomorantrean: string): Promise<number | null> {
        const rows: any = await pool.query(`
            SELECT angkaantrean
            FROM antrian
            WHERE nomorantrean = ?
            ORDER BY angkaantrean DESC
            LIMIT 1
        `, [nomorantrean]);

        return rows.length ? rows[0][0].angkaantrean : null;
    }

    static async getLastNorm(): Promise<string> {
        const rows: any = await pool.query(`
            SELECT norm
            FROM antrian
            ORDER BY norm DESC
            LIMIT 1
        `);

        if (rows.length) {
            const lastNorm = rows[0][0].norm;
            const newNorm = String(Number(lastNorm) + 1).padStart(4, '0');
            return newNorm;
        } else {
            return '0001';
        }
    }

}

