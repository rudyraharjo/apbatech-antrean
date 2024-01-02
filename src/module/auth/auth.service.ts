
import { UserRepository } from "../user/user.repository";
import bcrypt from 'bcryptjs';
import * as jwt from '../../utils/jwt';
import RegisterDtoPayload from "../../dto/RegisterDtoPayload";

export class AuthService {
    static async generateToken(username: string | undefined, password: string): Promise<any> {
        const user = await UserRepository.findByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            const loggedInUser = {
                "userId": user.id, "username": username
            };
            const accessToken = await jwt.generateAccessToken({
                ...loggedInUser,
                userId: Number(user.id)
            });
            return accessToken
        }

    }

    static async register(user: RegisterDtoPayload): Promise<any> {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashedPassword;
        const userId = await UserRepository.create(user);
        const loggedInUser = {
            "userId": userId, "username": user.username
        };
        const accessToken = await jwt.generateAccessToken({
            ...loggedInUser,
            userId: userId
        });
        return accessToken;
    }
}
