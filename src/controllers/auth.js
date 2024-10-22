import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserAdm from "../models/mongoDB/UserAdm.js";
const saltRounds = 10

export const authController = {
    async registerUserAdm(req, res) {
        try {
            const { fullName, email } = req.body
            const password = await hash(req.body.password, saltRounds)
            const newUserAdm = new UserAdm({ fullName, email, password })
            const response = await newUserAdm.save()
            res.status(200).json({ success: true, message: "Nuevo Usuario Adm registrado", data: response })
            
        } catch (err) {
                res.status(500).json({ success: false, message: "error interno del servidor" })
        }
    },

    async login(req, res) {
        const response = await UserAdm.find().where({ email: req.body.email })
        if (!response.length) {
            return res.status(401).json({ success: false, message: "Email o Password invalidos" })
        }    
        const isSamePassword = await compare(req.body.password, response[0].password)
        if (!isSamePassword) {
            return res.status(401).json({ success: false, message: "Email o Password invalidos" })            
        }
        const userAdmforToken = {
                userAdmName: response[0].fullName,
                userAdmEmail: response[0].email,
                sub: response[0].id
                }
            const accessToken = jwt.sign(userAdmforToken, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({ success: true, message: 'Usuario autenticado', data: accessToken })
    },

}
