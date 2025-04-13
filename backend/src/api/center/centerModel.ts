// src/models/Center.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface CenterAttributes {
  id: number;
  code: string;
  name: string;
  institute_id: number;
}

interface CenterCreationAttributes extends Optional<CenterAttributes, 'id'> {}

class Center extends Model<CenterAttributes, CenterCreationAttributes> implements CenterAttributes {
  public id!: number;
  public code!: string;
  public name!: string;
  public institute_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Center.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'institutes',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'centers',
  }
);

export default Center;