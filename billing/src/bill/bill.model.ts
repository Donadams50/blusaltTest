import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
        {
                customerId: {
                        type: String,
                        required: true,
                },
                amount: {
                        type: String,
                        required: true,
                },
                initialBalance:{
                        type: Number,
                        required: true,
                },
                finalBalance:{
                        type: Number,
                        required: true,
                },
              
                transactionId: {
                        type: String,
                     
                },
                status: {
                        type: String,
                        required: true,
                }
               
                
        },
        {
                timestamps: true,
        }
);

const Bill = mongoose.model('Billing', billSchema);

export { Bill };
