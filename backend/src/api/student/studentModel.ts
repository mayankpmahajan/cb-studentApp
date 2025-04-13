import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface StudentAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  roll_number: string;
  google_id: string;
  created_at: Date;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id'> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone_number!: string;
  public roll_number!: string;
  public google_id!: string;
  public created_at!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roll_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'students',
  }
);

export default Student