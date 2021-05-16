import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import {User} from '../entity/User';

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayload;
      //  console.log(' id id id id did id', userId);
        const userRepository = getRepository(User);
        let user: User;

        try {
             user = await userRepository.findOneOrFail(userId);

        } catch (error) {
            res.status(404).json({message: "Not authorized"});
        }
        
        // Check
        const { role } = user;
        //console.log(' ROLE---->', role);
        if (roles.includes(role)) {
            next();
        } else {
            res.status(404).json({message: "Not authorized"});
        }

    }
} 
