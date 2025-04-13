// src/models/Course.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface CourseAttributes {
  id: number;
  code: string;
  name: string;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}

class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  public id!: number;
  public code!: string;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
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
  },
  {
    sequelize,
    tableName: 'courses',
  }
);

export default Course;