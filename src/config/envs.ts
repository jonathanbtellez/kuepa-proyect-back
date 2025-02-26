import 'dotenv/config'
import * as joi from 'joi';

interface EnvVars{
    PORT: number;
    DATABASE_URL: string;
    DATABASE_NAME: string;
    JWT_SECRET: string;
    TOKEN_EXPIRATION: number
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    DATABASE_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    TOKEN_EXPIRATION: joi.string().required()
})
.unknown(true)

const {error, value} = envsSchema.validate(process.env)

if(error){
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    databaseName: envVars.DATABASE_NAME,
    jwtSecret: envVars.JWT_SECRET,
    tokenExpiration: envVars.TOKEN_EXPIRATION
}