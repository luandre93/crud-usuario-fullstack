import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from "../db.config";

class Groups extends Model {
    public id!: number;
    public group!: string;
    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    public readonly deleteAt!: Date;
}

Groups.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    group: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: false,
    freezeTableName: true,
})

export default Groups;