// User Interface
interface UserAttributes {
  id: number;
  firstname: string;
  lastname?: string | null;
  email: string;
  password: string;
  wallet?: number;
  created_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "lastname" | "created_at"> {}

// Sequelize User Model
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstname!: string;
  public lastname!: string | null;
  public email!: string;
  public password!: string;
  public wallet!: number;
  public created_at!: Date;
}

// Sequelize User Model Initialization
export const initUser = (sequelize: Sequelize): void => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING(46),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(46),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(62),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      wallet: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      timestamps: false,
    }
  );
};
