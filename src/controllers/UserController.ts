import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import IUser from '../interfaces/cadasterUser.type'
import { userRepository } from '../repositories/userRepository'
export class UserController {
    async cadaster(req: Request, res: Response) {
        const { name, email, password }: IUser = req.body
        try {
            const validation = await userRepository.findOneBy({ email })
            if (validation) return res.status(400).json({ message: "E-mail já cadastrado!" })

            const passwordCrypted = await bcrypt.hash(password, 10)

            await userRepository.insert({
                name,
                email,
                password: passwordCrypted,
            })

            return res.status(201).json()

        } catch (e: any) {
            return res.status(500).json({ message: "Erro interno no servidor" })
        }
    }

    async login(req: Request, res: Response) {
        const { email, password }: IUser = req.body
        try {
            const user = await userRepository.findOneBy({ email })
            if (!user) {
                return res.status(404).json({ message: "Usuário e/ou senha inválido(s)." })
            }

            const conferencePassword = await bcrypt.compare(password, user.password)
            if (!conferencePassword) {
                return res.status(404).json({ message: "Usuário e/ou senha inválido(s)." })
            }


            const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
                expiresIn: '8h'
            });

            const { password: _, ...userLogin } = user


            return res.status(201).json({
                user: { ...userLogin, token }
            })

        } catch (e: any) {

            return res.status(500).json(e)

        }
    }

    async user(req: Request, res: Response) {

        try {
            return res.status(200).json({ user: req.user })
        } catch (e: any) {
            return res.status(500).json(e)
        }

    }

    async updateUser(req: Request, res: Response) {
        const { name, email, password } = req.body
        const { id, email: currentEmail } = req.user

        try {
            if (email !== currentEmail) {
                const user = await userRepository.findOneBy({ email })
                if (user) {
                    return res.status(400).json({ message: "O e-mail informado já está sendo utilizado por outro usuário." })
                }
            }

            const passwordCrypted = await bcrypt.hash(password, 10)

            await userRepository.update({ id }, { name, email, password: passwordCrypted })

            return res.status(204).json()

        } catch (e: any) {
            return res.status(500).json(e)
        }
    }
}