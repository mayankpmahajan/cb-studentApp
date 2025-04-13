// src/db/index.ts
import { Sequelize } from 'sequelize';
import { logger } from '../app';

// Create the sequelize instance BEFORE importing any models
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'studentdb',
  logging: (msg: any) => logger.debug(msg)
});

// Export sequelize so it can be imported by model files
export { sequelize };

// Now import the models - AFTER sequelize has been defined and exported
import Student from '../api/student/studentModel';
import Center from '../api/center/centerModel';
import Course from '../api/course/courseModel';
import Institute from '../api/institute/instituteModel';
import Batch from '../api/batch/batchModel';
import { CenterCourse, Enrollment } from '../api/mappings/mappingsModel';
import { Resource, Test, Video } from '../api/resource/resourceModel';

// Define associations here
const initModels = async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Set up relationships (associations)
    Student.belongsToMany(CenterCourse, { through: Enrollment });
    Student.hasMany(Enrollment, { foreignKey: 'student_id' });
    CenterCourse.belongsToMany(Student, { through: Enrollment });
    CenterCourse.belongsTo(Center, { foreignKey: 'center_id' });
    CenterCourse.belongsTo(Course, { foreignKey: 'course_id' });
    Enrollment.belongsTo(Batch, { foreignKey: 'batch_id' });
    Enrollment.belongsTo(Student, { foreignKey: 'student_id' });
    Enrollment.belongsTo(CenterCourse, { foreignKey: 'center_course_id' });
    Batch.belongsTo(CenterCourse, { foreignKey: 'center_course_id' });
    Resource.belongsTo(Course, { foreignKey: 'course_id' });
    Test.belongsTo(Resource, { foreignKey: 'resource_id' });
    Video.belongsTo(Resource, { foreignKey: 'resource_id' });

    // Sync all models
    await Promise.all([
      Student.sync(),
      Center.sync(),
      Course.sync(),
      Institute.sync(),
      Batch.sync(),
      CenterCourse.sync(),
      Enrollment.sync(),
      Resource.sync(),
      Test.sync(),
      Video.sync(),
    ]);

    console.log("All models synced successfully");

  } catch (error) {
    console.error('Error syncing models:', error);
  }
};

const connectDB = async () => {
  try {
    await initModels();
    logger.info('Models synced successfully!')
  } catch (error) {
    logger.error('PostgreSQL connection failed: ' + error);
    throw error;
  }
};

export { connectDB };