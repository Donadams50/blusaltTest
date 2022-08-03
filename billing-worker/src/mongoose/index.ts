import { MongoClient } from 'mongodb';

import dotenv from 'dotenv';

dotenv.config();

const mongo_url = process.env.DB_URL || '';

const client = new MongoClient(mongo_url)
client.connect();
const databaseBilling = client.db("billingBlusalt");
const databaseCustomer = client.db("customerblusalt");
export   const customerBilling = databaseBilling.collection("billings");
export   const customerDetails= databaseCustomer.collection("customers");



