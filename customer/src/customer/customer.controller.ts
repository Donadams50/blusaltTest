import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Customer } from './customer.model';
import { customerFundParams } from '../types/customer.fund';
import axios from 'axios';
dotenv.config();

// fund customer account
export async function fundAccount(req: Request, res: Response): Promise<Response> {
        const {customerId, amount} = await req.body;
        try {    
                //check if customer exist and also to get other details of the customer
                const isUserExist = await Customer.findOne({_id: customerId});
               
                if (!isUserExist) return res.status(400).send({ status: 400, message: ' User does not exists' });
                
                const headers = {
                        'Authorization': process.env.token!,
                        'Content-Type': 'application/json'      
                        }
                const params: customerFundParams  = {
                        customerId: customerId,
                        amount: amount,
                        email: isUserExist.email,
                        initialBalance: isUserExist.balance
                };

                //as requested, the call the billing service using a RESTful-based communication.
                const  fundAccount = await axios.post(process.env.billBaseUrl!, params, {headers: headers}) 
               
                if(fundAccount.status == 200){
                        return res.status(200).send({ status: 200, message: 'Fund Account Initiated succesfully' });
                }else{
                        return res.status(400).send({ status: 400, message: 'Funding of account not succesfully' });
                }
                
        } catch (err) { 
                console.log(err);
                return res.status(500).send({ status: 500, message: 'Error while creating funding account' });
        }
}

//get all users
export async function getUsers(req: any, res: Response): Promise<Response> {
        try{
                const users = await Customer.find().sort({"_id": -1})
                return  res.status(200).send({ status: 200, message: users})
                
        }catch(err){
                console.log(err)
                return  res.status(500).send({ status: 500, message:"Error while getting  users "})
        }
}