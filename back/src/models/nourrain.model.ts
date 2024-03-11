// Nourrain Interface
import { User } from "./user.model";

interface NourrainAttributes {
    id: number;
    name: string;
    description?: string;
    owner_id?: number;
    created_at?: Date;
    wallet: number;
  }
  
  interface NourrainCreationAttributes extends Optional<NourrainAttributes, "id" | "description" | "owner_id" | "created_at"> {}
  
  // Sequelize Nourrain Model
  import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { NourrainsUsers } from "./nourrains_users.model";
  
  export class Nourrain extends Model<NourrainAttributes, NourrainCreationAttributes> implements NourrainAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
    public owner_id?: number;
    public created_at?: Date;
    public wallet!: number;
  }
  
  // Sequelize Nourrain Model Initialization
  export const initNourrain = (sequelize: Sequelize): void => {
    Nourrain.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(62),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        owner_id: {
          type: DataTypes.INTEGER,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        wallet: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: 'nourrain',
        modelName: 'Nourrain',
        timestamps: false,
      }
    );
  };
