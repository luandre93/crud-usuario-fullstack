import { IGroupUsers } from '@/interfaces/groupusers.interface'
import GroupUsers from '../models/groupusers.model';


export async function getAllGroupUsers(): Promise<IGroupUsers[]> {
    return await GroupUsers.findAll();
}

export async function getGroupUserById(id: number): Promise<IGroupUsers | null> {
    return await GroupUsers.findOne({
        where: { id: id }
    })
}

export async function delGroupUserById(id: number): Promise<IGroupUsers | number> {
    return await GroupUsers.destroy({
        where: { id: id }
    })
}

export async function postGroupUser(groupUserData: IGroupUsers): Promise<void> {
    await GroupUsers.create({ ...groupUserData });
}