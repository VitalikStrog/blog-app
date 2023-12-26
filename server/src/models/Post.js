import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

export const Post = sequelize.define('post', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
