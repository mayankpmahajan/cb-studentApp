import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface BatchAttributes {
  id: number;
  code: string;
  name: string;
  center_course_id: number;
}

interface BatchCreationAttributes extends Optional<BatchAttributes, 'id'> {}

class Batch extends Model<BatchAttributes, BatchCreationAttributes> implements BatchAttributes {
  public id!: number;
  public code!: string;
  public name!: string;
  public center_course_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Batch.init(
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
    center_course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'center_courses',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'batches',
  }
);

export default Batch;