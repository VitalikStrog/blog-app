import 'dotenv/config';
import { sequelize } from './utils/db.js';
import './models/User.js';
import './models/Post.js';
import './models/Role.js';

export const setupDb = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync();
    console.log("DB connection established")
  } catch (error) {
    console.log(error)
    setTimeout(() => setupDb(), 3000)
  }
}
