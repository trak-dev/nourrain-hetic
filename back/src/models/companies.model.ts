// Companies Interface
interface CompaniesAttributes {
    id: number;
    location: { type: 'Point'; coordinates: [number, number] };
    name: string;
  }
  
  interface CompaniesCreationAttributes extends Optional<CompaniesAttributes, "id"> {}
  
  // Sequelize Companies Model
  import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
  
  export class Companies extends Model<CompaniesAttributes, CompaniesCreationAttributes> implements CompaniesAttributes {
    public id!: number;
    public location!: { type: 'Point'; coordinates: [number, number] };
    public name!: string;
  }
  
  // Sequelize Companies Model Initialization
  export const initCompanies = (sequelize: Sequelize): void => {
    Companies.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        location: {
          type: DataTypes.GEOGRAPHY('POINT'),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(62),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'companies',
        modelName: 'Companies',
        timestamps: false,
      }
    );
  };
  