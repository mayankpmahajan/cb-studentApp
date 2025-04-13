import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface ResourceAttributes {
  id: number;
  title: string;
  description: string;
  resource_type: string;
  course_id: number;
}

interface ResourceCreationAttributes extends Optional<ResourceAttributes, 'id'> {}

class Resource extends Model<ResourceAttributes, ResourceCreationAttributes> implements ResourceAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public resource_type!: string;
  public course_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resource_type: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'resources',
  }
);

interface TestAttributes {
    id: number;
    resource_id: number;
    duration: number;
    max_marks: number;
    scheduled_time: Date;
  }
  
  interface TestCreationAttributes extends Optional<TestAttributes, 'id'> {}
  
  class Test extends Model<TestAttributes, TestCreationAttributes> implements TestAttributes {
    public id!: number;
    public resource_id!: number;
    public duration!: number;
    public max_marks!: number;
    public scheduled_time!: Date;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Test.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      resource_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'resources',
          key: 'id',
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scheduled_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tests',
    }
  );
  
  interface VideoAttributes {
    id: number;
    resource_id: number;
    youtube_id: string;
    duration: number;
    instructor: string;
  }
  
  interface VideoCreationAttributes extends Optional<VideoAttributes, 'id'> {}
  
  class Video extends Model<VideoAttributes, VideoCreationAttributes> implements VideoAttributes {
    public id!: number;
    public resource_id!: number;
    public youtube_id!: string;
    public duration!: number;
    public instructor!: string;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Video.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      resource_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'resources',
          key: 'id',
        },
      },
      youtube_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      instructor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'videos',
    }
  );

  export {Resource, Test, Video}