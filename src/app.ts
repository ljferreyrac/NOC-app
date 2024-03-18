import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


const main = async () => {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    Server.start();
    
    // Crear un colección = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // });

    // await newLog.save();

    // const logs = await LogModel.find();
    // console.log(logs);
    // console.log(envs);
}

(async () => {
    await main();
})();