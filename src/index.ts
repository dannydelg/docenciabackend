import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from './routes';


const  PORT = process.env.PORT || 5000;


createConnection().then(async () => {

    // create express app
    const app = express();
    //Middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use('/', routes);

    // start express server
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));

    
}).catch(error => console.log(error));
