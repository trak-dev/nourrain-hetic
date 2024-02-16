// GuirkPurchase Interface
interface GuirkPurchaseAttributes {
    id: number;
    user_id: number;
    nourrain_id: number;
    date?: Date;
}

interface GuirkPurchaseCreationAttributes extends Optional<GuirkPurchaseAttributes, "id" | "date"> {}

// Sequelize GuirkPurchase Model
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export class GuirkPurchase extends Model<GuirkPurchaseAttributes, GuirkPurchaseCreationAttributes> implements GuirkPurchaseAttributes {
    public id!: number;
    public user_id!: number;
    public nourrain_id!: number;
    public date?: Date;
}

// Sequelize GuirkPurchase Model Initialization
export const initGuirkPurchase = (sequelize: Sequelize): void => {
    GuirkPurchase.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
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
            tableName: 'guirk_purchase',
            modelName: 'GuirkPurchase',
            timestamps: false,
        }
    );
};
