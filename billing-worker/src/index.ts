import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import amqp from "amqplib";

import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

// Connect to port
const port = process.env.PORT || 6000;

const rabbitmqBaseUrl = process.env.rabbitmqBaseUrl!

import { customerBilling, customerDetails } from './mongoose/index';


const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(json());
app.use(cors());

dotenv.config();

async function start() {
         try {
                const connection = await amqp.connect(rabbitmqBaseUrl);
                const channel = await connection.createChannel();
                await channel.assertQueue("fundAccountbill");
                await channel.consume("fundAccountbill",  async message => {
                const input = JSON.parse(message!.content.toString());
                let transactionId = input.transactionId
                let finalBalance = input.finalBalance
                let customerId  = input.customerId
                let status = "SUCCESS"
                await sleep(5000);
                console.log(2);
                let x = await customerBilling.updateOne({transactionId:transactionId }, { $set: {"status" : status,} },{ upsert: true })
                console.log(x)
                let y = await customerDetails.updateOne({_id:customerId }, { $set: {"balance" : finalBalance,} },{ upsert: true })
                console.log(y)
                console.log("yes");
                channel.ack(message!);
                });
                
              } catch (ex) {
                console.error(ex);
              }
        
}
      
function sleep(ms: number) {
return new Promise((resolve) => {
        setTimeout(resolve, ms);
});
}


start()

app.get('/',  async (req: Request, res: Response): Promise<Response> =>
        res.status(200).send({
                message: 'Welcome to BLUSALT bill worker!',
        })
);

app.listen(port, () => {
        console.log(`server is listoning on port ${port}`);
});
