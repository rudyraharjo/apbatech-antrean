import JWTDtoPayload from './JWTDtoPayload';

interface LoggedInUserDtoPayload extends JWTDtoPayload {
    userId: number;
}

export default LoggedInUserDtoPayload;