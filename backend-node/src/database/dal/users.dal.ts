import Users from '../models/users.model';
import Rules from '../models/rules.model';
import Groups from '../models/groups.model';
import GroupUsers from '../models/groupusers.model';
import { postGroupUser } from './groupusers.dal';
import { IUser } from '@/interfaces/users.interface'
import { IUserSession } from '@/interfaces/rules.interface'

async function createUser(user: IUser): Promise<IUser> {
    return await Users.create({ username: user.username, email: user.email, user_ad: user.user_ad, permitted: user.permitted });
}

async function createSession(session: IUserSession): Promise<IUserSession> {
    return await Rules.create({ user_sessions: session.user_sessions });
}

export async function getAllUsers(): Promise<IUser[]> {
    return await Users.findAll();
}

export async function getUserById(id: number): Promise<IUser | null> {
    return await Users.findOne({ where: { id: id } })
}

export async function getUserByUsername(username: string): Promise<any> {
    return await Users.findOne({ where: { username: username } })
}

export async function delUserById(id: number): Promise<any> {
    return await Users.destroy({ where: { id: id } })
}

export async function postUser(...userData: IUser[]): Promise<any> {
    try {
        const username = userData[0].username;
        const existingUser: Promise<IUser> = await getUserByUsername(username);
        if (!existingUser) {
            const groupId: number = 0; // Tipo Usuário = 0 | administrador Tipo = 1.
            const email = userData[0].email;
            const user_ad = userData[0].user_ad;
            const permitted = userData[0].permitted;
            const session: IUserSession = { user_sessions: "" };
            const createdUser: IUser = await createUser({ username, email, user_ad, permitted });
            const createdSession: IUserSession = await createSession(session);
            await postGroupUser({ user_id: createdUser.id, group_id: groupId, rule_id: createdSession.id });
        } else {
            return { error: 'Usuario já existe na base de dados.' };
        }
    } catch (e) {
        console.log(e)
    }
}


export async function updateUser(user: IUser): Promise<any> {
    return await Users.update(
        { username: user.username, email: user.email, user_ad: user.user_ad, permitted: user.permitted },
        { where: { id: user.id } }
    )
}


export async function getAllGroupAndUsers(): Promise<any> {
    try {
        GroupUsers.belongsTo(Users, { foreignKey: 'user_id' })
        GroupUsers.belongsTo(Groups, { foreignKey: 'group_id' })
        GroupUsers.belongsTo(Rules, { foreignKey: 'rule_id' })
        return GroupUsers.findAll({ raw: false, include: [Users, Groups, Rules] })
    } catch (e) {
        console.log(e)
    }
}


export async function getUserAndGroupById(id: number): Promise<any> {
    try {
        GroupUsers.belongsTo(Users, { foreignKey: 'user_id' })
        GroupUsers.belongsTo(Groups, { foreignKey: 'group_id' })
        GroupUsers.belongsTo(Rules, { foreignKey: 'rule_id' })
        let result = await GroupUsers.findOne({
            include: [
                { model: Users, where: { id: id } },
                { model: Groups, },
                { model: Rules }
            ],
            raw: false
        })
        return result;
    } catch (e) {
        console.log(e)
    }
}

export async function getUserAndGroupByUsername(username: string): Promise<any> {
    try {
        GroupUsers.belongsTo(Users, { foreignKey: 'user_id' })
        GroupUsers.belongsTo(Groups, { foreignKey: 'group_id' })
        GroupUsers.belongsTo(Rules, { foreignKey: 'rule_id' })
        let result = await GroupUsers.findOne({
            include: [
                { model: Users, where: { username: username } },
                { model: Groups, },
                { model: Rules }
            ],
            raw: false
        })
        return result;
    } catch (e) {
        console.log(e)
    }
}