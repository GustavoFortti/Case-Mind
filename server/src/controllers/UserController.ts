import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import User from '../models/User';
import * as Yup from 'yup';
import authConfig from '../config/auth'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {

    async create(request: Request, response: Response)  {
        const path = {path : request.file.filename};
        // const path = "void";

        const {
            name,
            cpf,
            email,
            password,
            online,
            level,
        } = request.body;

        const hash = bcrypt.hashSync(password, 10);
        
        const userRepository = getRepository(User);

        if ((await userRepository.createQueryBuilder("user").where("user.email = :email OR user.cpf = :cpf", { email: email, cpf: cpf }).getOne())) {
            return response.status(400).send({ error: 'User already exists'});
        }

        const data = {
            name,
            cpf,
            email,
            password: hash,
            online,
            level: '1',
            path
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
            online: Yup.string().required(),
            level: Yup.string().required(),
            path: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const user = userRepository.create(data);
    
        await userRepository.save(user);

        request.body.password = undefined;

        return response.status(201).json(user);
    },

    async authenticate (request: Request, response: Response) {
        const userRepository = getRepository(User);

        const { log, password } = request.body;
        const user = await userRepository.createQueryBuilder("user")
                                        .where("user.cpf = :cpf OR user.email = :email", { cpf: log, email: log }).getOne();
        

        if (!user){
            return response.status(400).send({ error: 'User not found' });
        }

        if (!await bcrypt.compare(password, String(user.password))) {
            return response.status(400).send({ error: 'Invalid password'});
        }

        if (user.level === "0") {
            return response.status(400).send({ error: 'User disabled'});
        }
        
        user.password = '';

        const token = jwt.sign({ id: user.id}, authConfig.secret, {
            expiresIn: 43200,
        });

        return response.json({ user, token});
    },

    async alter(request: Request, response: Response) {
        const userRepository = getRepository(User);

        const {
            name,
            cpf,
            email,
        } = request.body;

        await userRepository
            .createQueryBuilder("user")
            .update<User>(User, { name: name, cpf: cpf, email: email})
            .where("id = :id", { id : request.params.id })
            .execute();

        return response.status(200).send({ success: "Success updating"})
    },

    async password(request: Request, response: Response) {
        const userRepository = getRepository(User);

        const {
            password
        } = request.body;

        const hash = bcrypt.hashSync(password, 10);
        
        await userRepository
            .createQueryBuilder("user")
            .update<User>(User, { password: hash})
            .where("id = :id", { id : request.params.id })
            .execute();

        return response.status(200).send({ success: "Success updating"})
    },

    async show(request: Request, response: Response)  {
        const { id } = request.params;

        const userRepository = getRepository(User);
        
        const user = await userRepository.findOneOrFail(id);

        return response.json(user);
    },

    async online(request: Request, response: Response) {
        const userRepository = getRepository(User);
        
        
        const online = request.body.online == 1 ? "0" : "1";
        
        await userRepository
            .createQueryBuilder("user")
            .update<User>(User, { online: online})
            .where("id = :id", { id : request.params.id })
            .execute();

        return response.status(200).send({ success: "Success updating"})
    }
}