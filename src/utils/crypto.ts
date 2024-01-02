
import crypto from 'crypto';
import BadRequestError from '../exceptions/BadRequestError';

// let logger = (func: any) => {
//     console.log(func);
// };

export async function generateSalt(rounds: number): Promise<string> {
    if (rounds >= 15) {
        throw new BadRequestError(`${rounds} is greater than 15, Must be less that 15`);
    }
    if (typeof rounds !== 'number') {
        throw new BadRequestError('rounds param must be a number');
    }

    if (rounds == null) {
        rounds = 12;
    }

    let salt = crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
    return salt;
}

export async function hasher(password: string, salt: any): Promise<any> {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        hashedpassword: value
    };
}

export async function hash(password: string, salt: any): Promise<any> {
    if (password == null || salt == null) {
        throw new BadRequestError('Must Provide Password and salt values');
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new BadRequestError('password must be a string and salt must either be a salt string or a number of rounds');
    }
    return hasher(password, salt);
}

export async function compare(password: string, hash: any): Promise<boolean> {
    if (password == null || hash == null) {
        throw new BadRequestError('password and hash is required to compare');
    }
    if (typeof password !== 'string' || typeof hash !== 'object') {
        throw new BadRequestError('password must be a String and hash must be an Object');
    }
    // console.log(password);
    // console.log(hash.salt);
    let passwordData = await hasher(password, hash.salt);
    console.log(passwordData);
    if (passwordData.hashedpassword === hash.hashedpassword) {
        return true;
    }
    return false
}

export async function newCompare(password: string, userDbPassword: string): Promise<boolean> {
    if (password == null || userDbPassword == null) {
        throw new BadRequestError('password and userPassword is required to compare');
    }

    if (password === userDbPassword) {
        return true;
    }
    return false
}

export async function randomString(length: number): Promise<string> {
    return crypto.randomBytes(length).toString('hex');
}

