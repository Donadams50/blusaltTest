import mongoose from 'mongoose';

import CustomersSeeder from './seeders/customers.seeder';

const mongoURL = process.env.DB_URL || 'mongodb://localhost:27017/dbname';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  CustomersSeeder
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  mongoose.connect(mongoURL);
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
