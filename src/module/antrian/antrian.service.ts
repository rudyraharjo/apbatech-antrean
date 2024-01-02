import { AntrianRepository } from './antrian.repository';

export class AntrianService {

    static async getAntrianByKodePoliAndTgl(kodepoli: string, tglperiksa: string): Promise<any | null> {
        return await AntrianRepository.findByKodePoliAndTgl(kodepoli, tglperiksa);
    }

    static async addAntrian(data: any): Promise<any | null> {
        return await AntrianRepository.storeAntrian(data);
    }

    static async getRemainingByNokartuKodePoliAndTglPeriksa(nomorkartu_jkn: string, kodepoli: string, tglperiksa: string): Promise<any | null> {
        return await AntrianRepository.findByNoKartuKodePoliAndTgl(nomorkartu_jkn, kodepoli, tglperiksa);
    }

    static async cancelAntrian(nomorkartu: string, kodepoli: string, tanggalperiksa: string): Promise<number> {
        return await AntrianRepository.updateCancelAntrian(nomorkartu, kodepoli, tanggalperiksa);
    }

}