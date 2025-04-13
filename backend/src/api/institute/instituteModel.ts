// src/models/Institute.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface InstituteAttributes {
  id: number;
  name: string;
}

interface InstituteCreationAttributes extends Optional<InstituteAttributes, 'id'> {}

class Institute extends Model<InstituteAttributes, InstituteCreationAttributes> implements InstituteAttributes {
  public id!: number;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Institute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'institutes',
  }
);

export default Institute;