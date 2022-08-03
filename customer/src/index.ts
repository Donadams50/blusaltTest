import express, { Request, Response } from 'express';
import { json } from 'body-parser';


import cors from 'cors';

import dotenv from 'dotenv';

import { mongoConfig } from './mongoose/index';

import { customerRouter } from './customer/customer.routes';


// Connect to port
const port = process.env.PORT || 4000;
mongoConfig;

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use(json());
app.use(cors());

app.use('/customer', customerRouter);


dotenv.config();

app.get('/',  async (req: Request, res: Response): Promise<Response> =>
        res.status(200).send({
                message: 'Welcome to BLUSALT!',
        })
);

app.listen(port, () => {
        console.log(`server is listoning on port ${port}`);
});
