// NourrainsUsers Interface
interface NourrainsUsersAttributes {
    user_id: number;
    nourrain_id: number;
    collect_vote?: boolean;
  }
  
  interface NourrainsUsersCreationAttributes extends Optional<NourrainsUsersAttributes, "collect_vote"> {}
  
  // Sequelize NourrainsUsers Model
  import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
  
  export class NourrainsUsers extends Model<NourrainsUsersAttributes, NourrainsUsersCreationAttributes> implements NourrainsUsersAttributes {
    public user_id!: number;
    public nourrain_id!: number;
    public collect_vote?: boolean;
  }
  
  // Sequelize NourrainsUsers Model Initialization
  export const initNourrainsUsers = (sequelize: Sequelize): void => {
    NourrainsUsers.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        nourrain_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        collect_vote: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'nourrains_users',
        modelName: 'NourrainsUsers',
        timestamps: false,
      }
    );
  };
