import express from 'express';

import * as validator from '../validators/validator';

import * as customer from './customer.controller';

const router = express.Router();

const { expressValidator, fundAccountValidator } = validator;

router.post('/fund/account', fundAccountValidator(), expressValidator, customer.fundAccount);


export { router as customerRouter };
