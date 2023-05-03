import Rules from '../models/rules.model'
import { IUserSession } from '@/interfaces/rules.interface'

export async function postRules(userSessions: IUserSession): Promise<any> {
    await Rules.create({ user_sessions: userSessions })
}

export async function getAllRules(): Promise<IUserSession[]> {
    return await Rules.findAll()
}

export async function getRules(session: string): Promise<IUserSession | null> {
    return await Rules.findOne({ where: { user_sessions: session } })
}


