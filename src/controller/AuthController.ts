import {getRepository} from 'typeorm';
import {Request, response, Response} from 'express';
import {User} from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';



class AuthController{

    static login = async (req: Request, res: Response) => {
        const {username, password} = req.body;
        if( !(username && password)){
            return res.status(400).json({message: 'Username and Password are required'});
        }
    
        const userRepository = getRepository(User);
        let user: User;
    
        try {
           
            user = await userRepository.findOneOrFail({where:{username}})
          
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: 'Username or password incorrect'});            
        }

        if (!user.checkPassword(password)) return res.status(400).json({message: "Username or password are incorrect!!"});

        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtScret, {expiresIn: '1h'} );

        res.json({message: 'OK', role: user.role, token: token});
    
    }

   static changePassword = async (req: Request, res: Response) => {
       const { userId } = res.locals.jwtPayload;
       //console.log(userId)

       const {oldPassword, newPassword} = req.body;
       //console.log(oldPassword);
      // console.log(newPassword);
       
       if (!(oldPassword && newPassword)) return res.status(400).json('Old password and new password are required');
       if ( oldPassword === newPassword ) return res.status(400).json('Old password and new password culdn´t be the same');
       
       const userRepository = getRepository(User);
       let user: User;
       
       try {
           user = await userRepository.findOneOrFail(userId);
           //console.log('User of .find', user)
           
       } catch (error) {
        return res.status(400).json({mesagge: error});
       }

       if (!user.checkPassword(oldPassword)) return res.status(404).json({message: "Check your old password!!"});

     
       user.password = newPassword;
       const validateOpt = { validationError: {target: false, value: false}};
       const errors = await validate(user, validateOpt);
      if (errors.length) return res.status(404).json(errors);

       // HASH PASSWORD
       user.hashPassword();
       // SAVE CHANGES
       
       try {
        const resp = await userRepository.save(user);
        // console.log('RESPUESTA DE LA BASE DA DATOS MYSQL CLOULD ', resp);
         return res.json({message: 'Password changed succesfully'});
           
       } catch (error) {
        return res.status(404).json(error);

       }     
        
      
          
       
      
       



   }
}

export default AuthController;