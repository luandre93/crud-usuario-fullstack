import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import VERSION_API from '../common/version.config';
import {
    getAllUsers,
    getUserById,
    updateUser,
    postUser,
    delUserById,
    getAllGroupAndUsers,
    getUserByUsername,
    getUserAndGroupById,
    getUserAndGroupByUsername
} from '../database/dal/users.dal';


export class UsersRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {

        this.app.route(`/${VERSION_API}/user`).get(async (req: express.Request, res: express.Response): Promise<void> => {
            try {
                const username: string = String(req.query.username);
                const userId: number = Number(req.query.id);
                let result;

                if (typeof username !== 'undefined') {
                    result = await getUserByUsername(username);
                    if (!result) {
                        res.status(404).send({ error: `Usuario não foi encontrado pelo username: ${username}` });
                    }
                } else if (typeof userId !== 'undefined') {
                    result = await getUserById(userId);
                    if (!result) {
                        res.status(404).send({ error: `Usuario não foi encontrado pelo id: ${userId}` });
                    }
                } else {
                    res.status(400).send({ error: `Os parâmetros de nome de usuário e id estão ausentes` });
                }
                res.status(200).send(result);
            } catch (err: any) {
                res.status(500).send({ error: 'Error interno no servidor' });
            }
        })

        this.app.route(`/${VERSION_API}/user`).post(async (req: express.Request, res: express.Response): Promise<any> => {
            try {
                const { username, user_ad, email, permitted } = req.body;
                console.log(req.body)
                if (!username) {
                    return res.status(400).send({ error: 'Campo do usuário requer ser preenchido.' });
                }
                const result = await postUser({ username, user_ad, email, permitted });
                res.status(201).send(result);
            } catch (err: any) {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    return res.status(400).send({ error: 'Usuário já existe na base de dados.' });
                }
                return res.status(500).send({ error: 'Error interno no servidor' });
            }
        });

        this.app.route(`/${VERSION_API}/user`).delete(async (req: express.Request, res: express.Response): Promise<void> => {
            try {
                const userId: number = Number(req.query.id);
                const result: Promise<any> = await delUserById(userId);
                if (await result) {
                    res.status(204).end();
                }
                else {
                    res.status(404).send({ error: `Não foi possivel achar o usuario com id: ${userId}.` })
                }
            } catch (err: any) {
                res.status(500).send({ error: 'Error interno no servidor' });
            }
        });

        this.app.route(`/${VERSION_API}/user`).put(async (req: express.Request, res: express.Response): Promise<any> => {
            try {
                const { id, username, user_ad, email, permitted } = req.body;
                if (!username) {
                    return res.status(400).send({ error: 'Campo do usuário requer ser preenchido.' });
                }
                const result = await updateUser({ id, username, user_ad, email, permitted });
                res.status(201).send(result);
            } catch (error) {
                res.status(500).send({ error: 'Error interno no servidor' });
            }
        })

        this.app.route(`/${VERSION_API}/users`).get(async (req: express.Request, res: express.Response): Promise<any> => {
            try {
                const users = await getAllUsers();
                if (!users) {
                    res.status(404).send({ error: `Não foi possivel achar os usuarios.` });
                    return;
                }
                res.status(200).send(users);
            } catch (err: any) {
                console.error(err);
                res.status(500).send({ error: 'Error interno no servidor.' });
            }
        })

        this.app.route(`/${VERSION_API}/getAllUsersAndGroup`).get(async (req: express.Request, res: express.Response): Promise<void> => {
            try {
                const groupsAndUsers = await getAllGroupAndUsers();
                res.status(200).send(groupsAndUsers);
            } catch (error) {
                res.status(500).send({ error: 'Error interno no servidor.' });
            }
        });

        this.app.route(`/${VERSION_API}/getUserAndGroup`).get(async (req: express.Request, res: express.Response): Promise<any> => {
            try {
                const id = Number(req.query.id);
                const username = String(req.query.username);
                let result;
                if (id) {
                    result = await getUserAndGroupById(id);
                    if (!result) {
                        res.status(404).send({ error: `Usuário não encontrado com id: ${id}` });
                        return;
                    }
                } else if (username) {
                    result = await getUserAndGroupByUsername(username);
                    if (!result) {
                        res.status(404).send({ error: `Usuário não encontrado com username: ${username}` });
                        return;
                    }
                }
                res.status(200).send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Error interno no servidor.' });
            }
        })
        return this.app;
    }
}
