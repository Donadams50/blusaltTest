import express from 'express';

import * as validator from '../validators/validator';

import * as bill from './bill.controller';

const router = express.Router();

const { expressValidator, fundAccountValidator } = validator;
import { verifyToken } from "../helpers/tokenUtils";

router.post('/fund/account', verifyToken,  fundAccountValidator(), expressValidator, bill.fundAccount);


export { router as billRouter };
