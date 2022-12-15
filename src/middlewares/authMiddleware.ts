import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken"

import { userRepository } from '../repositories/userRepository';

type JwtPayload = {
    id: number
}


export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) return res.status(401).json({ message: "Para acessar este recurso um token de autenticação válido deve ser enviado." })

    const token = authorization.split(" ")[1]

    try {

        const { id } = jwt.verify(token, process.env.JWT_PASS || '') as JwtPayload

        const user = await userRepository.findOneBy({ id })
        if (!user) return res.status(401).json({ message: "Usuário não autorizado" })

        const { password: _, ...loggedUser } = user
        req.user = loggedUser

        next()
    } catch (error) {

    }
}