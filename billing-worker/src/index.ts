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

// consumer function  gets triggered when the server starts which consumes and pending message queue from rabbimq. If this service is down, whenever it comes up, it automatically consume all message queue directed to it.
async function start() {
         try {
                const connection = await amqp.connect(rabbitmqBaseUrl);
                const channel = await connection.createChannel();
                await channel.assertQueue("fundAccountbill");
                await channel.consume("fundAccountbill",  async message => {
                const input = JSON.parse(message!.content.toString());
                let transactionId = input.transactionId
                let finalBalance = input.finalBalance
                let email  = input.email
                let status = "SUCCESS"
                await sleep(100);
                await customerBilling.updateOne({transactionId:transactionId }, { $set: {"status" : status,} })
                await customerDetails.updateOne({email: email }, { $set: {"balance" : finalBalance} })
                channel.ack(message!);
                });
                
              } catch (ex) {
                  console.error(ex);
              }
        
}
 
// delay function pass the amount of time you want it to delay as parameter
function sleep(ms: number) {
        return new Promise((resolve) => {
                setTimeout(resolve, ms);
        });
}


start()

app.get('/',  async (req: Request, res: Response): Promise<Response> =>
        res.status(200).send({
                message: 'Welcome to Blusalt bill worker!',
        })
);

app.listen(port, () => {
        console.log(`server is listoning on port ${port}`);
});
