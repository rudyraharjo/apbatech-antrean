import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';
import { AntrianService } from './antrian.service';

export async function getAntrianByKodePoliAndTgl(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    logger.log('info', 'POST /antrian/status/:kodepoli/:tglperiksa');
    try {

        const { kodepoli, tglperiksa } = req.params;

        if (!kodepoli || !tglperiksa) {
            res.status(400).json({
                metadata: {
                    message: 'Kodepoli and tglperiksa are required parameters',
                    code: 400
                }
            });
            return;
        }

        const result = await AntrianService.getAntrianByKodePoliAndTgl(kodepoli, tglperiksa);

        if (result) {
            res.status(200).json({
                response: { result },
                metadata: {
                    message: 'Ok',
                    code: 200
                }
            });
        } else {
            res.status(StatusCodes.CREATED).json({
                metadata: {
                    message: 'Antrian not found',
                    code: StatusCodes.CREATED
                }
            });
        }


    } catch (err) {
        next(err);
    }
}

export async function createAntrian(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    logger.log('info', 'POST /antrian');
    try {

        const result = await AntrianService.addAntrian(req.body);
        res.status(200).json({
            response: result,
            metadata: {
                message: 'Ok',
                code: 200
            }
        });

    } catch (err) {
        next(err);
    }
}

export async function getRemainingByNokartuKodePoliAndTglPeriksa(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    logger.log('info', 'GET /sisapeserta/:nomorkartu_jkn/:kodepoli/:tglperiksa');
    try {

        console.log(req.params);
        const { nomorkartu_jkn, kodepoli, tglperiksa } = req.params;

        if (!nomorkartu_jkn || !kodepoli || !tglperiksa) {
            res.status(400).json({
                metadata: {
                    message: 'nomorkartu_jkn atau Kodepoli atau tglperiksa are required parameters',
                    code: 400
                }
            });
            return;
        }

        const result = await AntrianService.getRemainingByNokartuKodePoliAndTglPeriksa(nomorkartu_jkn, kodepoli, tglperiksa);

        if (result) {
            res.status(200).json({
                response: { result },
                metadata: {
                    message: 'Ok',
                    code: 200
                }
            });
        } else {
            res.status(StatusCodes.CREATED).json({
                metadata: {
                    message: 'Antrian not found',
                    code: StatusCodes.CREATED
                }
            });
        }


    } catch (err) {
        next(err);
    }
}

export async function cancelAntrian(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    logger.log('info', 'PUT /antrian');
    try {

        const { nomorkartu, kodepoli, tanggalperiksa } = req.body;

        const result = await AntrianService.cancelAntrian(nomorkartu, kodepoli, tanggalperiksa);
        
        res.status(200).json({
            metadata: {
                message: 'Ok',
                code: 200
            }
        });

    } catch (err) {
        next(err);
    }
}

