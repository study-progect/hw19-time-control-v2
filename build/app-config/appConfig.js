import configJson from '../../config/time-control-config.json' with { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();
export const configuration = Object.assign(Object.assign({}, configJson), { mongo_key: process.env.MONGO_DB });
