import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from "../db.config";

class Rules extends Model {
    public id!: number;
    public user_sessions!: string;
}

Rules.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,

    },
    user_sessions: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: false,
    freezeTableName: false,
})

export default Rules;