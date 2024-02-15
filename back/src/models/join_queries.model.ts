// JoinQuery Interface
interface JoinQueryAttributes {
    user_id: number;
    nourrain_id: number;
    date?: Date;
  }
  
  interface JoinQueryCreationAttributes extends Optional<JoinQueryAttributes, "date"> {}
  
  // Sequelize JoinQuery Model
  import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
  
  export class JoinQuery extends Model<JoinQueryAttributes, JoinQueryCreationAttributes> implements JoinQueryAttributes {
    public user_id!: number;
    public nourrain_id!: number;
    public date?: Date;
  }
  
  // Sequelize JoinQuery Model Initialization
  export const initJoinQuery = (sequelize: Sequelize): void => {
    JoinQuery.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        nourrain_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        date: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: 'join_query',
        modelName: 'JoinQuery',
        timestamps: false,
      }
    );
  };
  