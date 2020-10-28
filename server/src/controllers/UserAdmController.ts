import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import User from '../models/User'

export default {

    async index(request: Request, response: Response)  {
        const userRepository = getRepository(User);
        const user = await userRepository.find();
        return response.json(user);
    },

    async alter(request: Request, response: Response) {
        const userRepository = getRepository(User);
        

        await userRepository
            .createQueryBuilder("user")
            .update<User>(User, { level: request.body.level})
            .where("id = :id", { id : request.params.id })
            .execute();

        return response.status(200).send({ success: "Success updating"})
    }
}