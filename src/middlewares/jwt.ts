import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //console.log('REQ---> ', req.headers);
    const token = <string>req.headers['auth'];
    //console.log(token)
    if (!token) return res.status(400).json({message: 'Token is required'});

    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtScret);
       
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //console.log(error);
        return res.status(404).json({message: 'No authorized!!'});
    }

    const {userId, username} = jwtPayload;

    const newToken = jwt.sign({userId, username}, config.jwtScret, {expiresIn: '1h'});
    res.setHeader('token', newToken);
    // Call next
    next();

}