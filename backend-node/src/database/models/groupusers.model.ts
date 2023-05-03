import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from "../db.config";
import Users from './users.model';
import Groups from './groups.model';
import Rules from './rules.model';

class GroupUsers extends Model {
    public id!: number;
    public group_id!: number;
    public user_id!: number;
    public rule_id!: number;
    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    public readonly deleteAt!: Date;
}

GroupUsers.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    group_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: Groups, key: 'id' }
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: Users, key: 'id' }
    },
    rule_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: Rules, key: 'id' }
    },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false,
    freezeTableName: true,
})

export default GroupUsers;