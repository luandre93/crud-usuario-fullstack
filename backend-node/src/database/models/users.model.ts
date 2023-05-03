import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from "../db.config";

class Users extends Model {
    public id!: number;
    public username!: string;
    public user_ad!: boolean;
    public email!: string;
    public permitted!: boolean;
    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    public readonly deleteAt!: Date;
}

Users.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_ad: { type: DataTypes.BOOLEAN, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    permitted: { type: DataTypes.BOOLEAN, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false,
    freezeTableName: true,
})

export default Users;