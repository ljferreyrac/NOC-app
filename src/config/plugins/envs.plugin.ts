import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),

    //Mongo DB
    MONGO_URL: env.get('MONGO_URL'),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME'),
    MONGO_USER: env.get('MONGO_USER'),
    MONGO_PASS: env.get('MONGO_PASS'),
}