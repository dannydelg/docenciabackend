import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate } from 'class-validator';


export class UserController {

    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User)
        
        try {
            const users = await userRepository.find();

            if(!users) return res.status(404).json({message: 'Not result'});
            //users.forEach(e => { e.password = null});
           
            res.json(users);
            
        } catch (error) {
            //console.log(error);
            res.status(500).json({message: 'Error Data Base Server', error: error});
        }
      
    } 

    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.findOneOrFail(id);
            res.json(user);
        } catch (error) {
            res.status(404).json({message: 'Not result'})
        }
    }

    static newUser = async  (req: Request, res: Response) => {
        const {username, password, role, } = req.body; 

        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role; 

        //Validate 
        const validateOpt = { validationError: 
                                { 
                                  target:false, 
                                  value:false
                                } 
                            };
        const errors = await validate(user, validateOpt);
        if ( errors.length > 0) return res.status(400).json(errors);

        //TODO : HASH PASSWORD

        const userRepository = getRepository(User);

        try {
            user.hashPassword();
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({message: 'Username already exist'});
        }

        res.json({message: 'User created succesfully'});



    } 

    static editUser = async  (req: Request, res: Response) => {
        let user; 
        const {id} = req.params;
        console.log(id);
        const {username, role} = req.body;
        console.log(username + ' ' + role )

        const userRepository = getRepository(User);

        try {
            user = await userRepository.findOneOrFail(id);
            user.username = username;
            user.role = role; 
        } catch (error) {
            return res.status(404).json({message: 'User not found'});
        }       

        const errors = await validate(user, {validationError:{target:false, value:false}});
        //const err = chargeErrors(errors);
    
        if ( errors.length > 0) return res.status(400).json(errors);

        try {
            await userRepository.save(user); 
        } catch (error) {
            return res.status(409).json({message: 'user already in use'})
        }

        res.status(201).json({message: 'User Udated '})

    }

    //DELETE USER

    static deleteUser = async  (req: Request, res: Response) => {

        const {id } = req.params;

        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(400).json({message: "User not found"});

        }

        try {
           await userRepository.delete(id); 
           return res.json({message: "User deleted succesfully"});
        } catch (error) {
            return res.status(500).json({message: "Error Data base server"});
        }
    }
}

export default UserController;

function chargeErrors(errors: import("class-validator").ValidationError[]): Array<{}> {
    let err: Array<{}> = [];
    errors.forEach( (e) => { 
        console.log(e.constraints);
         err.push(e.constraints); 
    })
    console.log(err);
    return err;
}
