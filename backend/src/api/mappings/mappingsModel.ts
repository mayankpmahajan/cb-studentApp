
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface CenterCourseAttributes {
  id: number;
  center_id: number;
  course_id: number;
}

interface CenterCourseCreationAttributes extends Optional<CenterCourseAttributes, 'id'> {}

class CenterCourse extends Model<CenterCourseAttributes, CenterCourseCreationAttributes> implements CenterCourseAttributes {
  public id!: number;
  public center_id!: number;
  public course_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CenterCourse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    center_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'centers',
        key: 'id',
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'center_courses',
  }
);


interface EnrollmentAttributes {
    id: number;
    student_id: number;
    center_course_id: number;
    batch_id: number;
    enrollment_date: Date;
  }
  
  interface EnrollmentCreationAttributes extends Optional<EnrollmentAttributes, 'id'> {}
  
  class Enrollment extends Model<EnrollmentAttributes, EnrollmentCreationAttributes> implements EnrollmentAttributes {
    public id!: number;
    public student_id!: number;
    public center_course_id!: number;
    public batch_id!: number;
    public enrollment_date!: Date;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Enrollment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      center_course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'center_courses',
          key: 'id',
        },
      },
      batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'batches',
          key: 'id',
        },
      },
      enrollment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'enrollments',
    }
  );

  export {CenterCourse, Enrollment}