import { registerAs } from "@nestjs/config";

export default registerAs(
    'jwtconfig',
    () => ({
        JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN
    })
)