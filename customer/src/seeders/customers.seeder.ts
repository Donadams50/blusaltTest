import mongoose from "mongoose"

import {Customer} from "../customer/customer.model"
import dotenv from 'dotenv';

dotenv.config();


const mongo_url = process.env.DB_URL || '';

export const mongoConfig = mongoose.connect(mongo_url).then(
        () => {
                console.log('Connected to the database!');
        },
        (err) => {
                console.log('Cannot connect to the database!', err);
                process.exit();
        }
);

const customer = [   
        {
                firstName:"Adam",
                lastName: "Alaka",
                username: "Donadams",
                email: "sumbomatic@gmail.com",
                phoneNumber: "08144964388",
                isVerified: true,
                balance: 0.0
        }
]
const seedDb = async () =>{
        await Customer.deleteMany();
        await Customer.insertMany(customer)
}; 

seedDb().then(() =>{
        mongoose.connection.close()
        console.log('Database seeded successfully!');
})