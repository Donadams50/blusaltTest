import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
        {
                firstName: {
                        type: String,
                        required: true,
                },
                lastName: {
                        type: String,
                        required: true,
                },
              
                username: {
                        type: String,
                     
                },
                email: {
                        type: String,
                        required: true,
                },
                
                phoneNumber: {
                        type: String,
                },
                
                isVerified: {
                        type: Boolean,
                        required: true
                },
                balance: {
                        type: Number,
                        required: true
                },
               
                
        },
        {
                timestamps: true,
        }
);

const Customer = mongoose.model('Customer', customerSchema);

export { Customer };
