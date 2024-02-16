// Guirk pricing Interface
interface GuirkPricingAttributes {
    id: number;
    amount: number;
    euro_price: number;
}

interface GuirkPricingCreationAttributes extends Optional<GuirkPricingAttributes, "id" | "amount" | "euro_price"> {}

// Sequelize Guirk pricing Model
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export class GuirkPricing extends Model<GuirkPricingAttributes, GuirkPricingCreationAttributes> implements GuirkPricingAttributes {
    public id!: number;
    public amount!: number;
    public euro_price!: number;
}

// Sequelize Guirk pricing Model Initialization
export const initGuirkPricing = (sequelize: Sequelize): void => {
    GuirkPricing.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            euro_price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
        },
        {
            sequelize,
            tableName: 'guirk_pricing',
            modelName: 'GuirkPricing',
            timestamps: false,
        }
    );
};
