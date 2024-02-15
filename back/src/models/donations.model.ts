// Donations Interface
interface DonationAttributes {
    user_id: number;
    nourrain_id: number;
    amount: number;
    anonymous?: boolean;
    date?: Date;
  }
  
  interface DonationCreationAttributes extends Optional<DonationAttributes, "date"> {}
  
  // Sequelize Donation Model
  import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
  
  export class Donation extends Model<DonationAttributes, DonationCreationAttributes> implements DonationAttributes {
    public user_id!: number;
    public nourrain_id!: number;
    public amount!: number;
    public anonymous?: boolean;
    public date?: Date;
  }
  
  // Sequelize Donation Model Initialization
  export const initDonation = (sequelize: Sequelize): void => {
    Donation.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        nourrain_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        anonymous: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: 'donations',
        modelName: 'Donation',
        timestamps: false,
    }
  );
};