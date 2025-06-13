import express from 'express';
import { configuration } from "./app-config/appConfig.js";
import * as mongoose from "mongoose";
import { accountRouter } from "./routers/accountRouter.js";
import { errorHandler } from "./errorHandler/errorHandler.js";
export const launchServer = () => {
    const app = express();
    app.listen(configuration.port, () => { console.log(`Server runs at port ${configuration.port}`); });
    mongoose.connect(configuration.mongo_key).then(() => console.log("Server connect to MongoDb"))
        .catch(err => console.log(err.message));
    app.use(express.json());
    app.use('/accounts', accountRouter);
    app.use(errorHandler);
};
