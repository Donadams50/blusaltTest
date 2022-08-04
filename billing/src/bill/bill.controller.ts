import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getCode } from '../helpers/codeGenerator';
import { Bill } from './bill.model';
import { transactionDetailsParams } from '../types/transactionDetails';

import amqp from "amqplib";

dotenv.config();

const rabbitmqBaseUrl = process.env.rabbitmqBaseUrl!

// fund customer account
export async function fundAccount(req: Request, res: Response): Promise<Response> {
        const {customerId, initialBalance, amount, email} = await req.body;
        const currentTimeStamp = Date.now()
        const codeGenerated = await getCode();
        const transactionId = `Trans${currentTimeStamp}${codeGenerated}`
        const status = "PENDING"
        const finalBalance = initialBalance + parseFloat(amount)
        try {   
                const bill = new Bill({
                        customerId:customerId,
                        initialBalance: initialBalance,
                        amount: amount,
                        transactionId: transactionId,
                        status: status,
                        finalBalance: finalBalance
                });
                const savebill = await bill.save();
               
                if (savebill._id) {
                        const recordId = savebill._id
                        const userDetails : transactionDetailsParams = {
                                recordId: recordId,
                                customerId: customerId,
                                amount: amount,
                                email: email,
                                initialBalance: initialBalance,
                                transactionId: transactionId,
                                finalBalance: finalBalance
                        }
                        // producer sending messages to the queue
                        
                        const msgBuffer = Buffer.from(JSON.stringify(userDetails));


                        //connecting to rabbitmq docker image
                        const connection = await amqp.connect(rabbitmqBaseUrl);
                        

                        // Create a channel
                        const channel = await connection.createChannel();

                        // Makes the queue available to the client
                        await channel.assertQueue("fundAccountbill");
                        
                        //Send a message to the queue
                        channel.sendToQueue("fundAccountbill", msgBuffer);
                        
                        await channel.close();
                        await connection.close();
                        
                        return res.status(200).send({ status: 200, message: 'Funding from bill service successful' });
                }else{
                        return res.status(400).send({ status: 400, message: 'Error while funding from bill service' });
                }
                
        } catch (err) {
                console.log(err);
                return res.status(500).send({ status: 500, message: 'Error from bill service ' });
        }
}



