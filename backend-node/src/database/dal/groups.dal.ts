import Groups from "../models/groups.model";

export async function getAllGroups(): Promise<any> {
    return await Groups.findAll();
}
