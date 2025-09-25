export default () => ({
    APP_PORT: parseInt(process.env.APP_PORT ?? '3000'),
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN
});