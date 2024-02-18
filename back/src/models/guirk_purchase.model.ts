// GuirkPurchase Interface
interface GuirkPurchaseAttributes {
    id: number;
    user_id: number;
    guirk_id: number;
    stripe_id: string;
    is_handled: boolean;
    date?: Date;
}

interface GuirkPurchaseCreationAttributes extends Optional<GuirkPurchaseAttributes, "id" | "date"> {}

// Sequelize GuirkPurchase Model
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export class GuirkPurchase extends Model<GuirkPurchaseAttributes, GuirkPurchaseCreationAttributes> implements GuirkPurchaseAttributes {
    public id!: number;
    public user_id!: number;
    public guirk_id!: number;
    public stripe_id!: string;
    public is_handled!: boolean;
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
            guirk_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            stripe_id: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false,
            },
            is_handled: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
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
