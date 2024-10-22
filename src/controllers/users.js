import User from "../models/mongoDB/User.js"
export const userController = {
    async getAll(req, res){
        try {
            const users = await User.find()
            users.length ?
                res.status(200).json({ success: true, message: "user collection", data: users })
                :
                res.status(404).json({ success: false, message: "Database de usuarios vacia" })
        } catch (error) {
            res.status(500).json({ success: false, message: "Error en el servidor" })
        }
    },

    async getByApellido(req, res) {
        const { apellido } = req.query
        if(!apellido) {
           return res.status(400).json({ success: false, message: "no enviste parametro query" })
        }
        try {
            const users = await User.find({ apellido: { $regex: apellido, $options: "i"} })
            if (!users.length) {
                return res.status(404).json({ success: false,  message: `No hay usuarios '${apellido}'  con ese apellido` })
            }
            res.status(200).json({ success: true, message: "Usuario con appellido requerido", data: users })
        } catch (error) {
            res.status(500).json({ success: false, message: "Error en el servidor" })
        }
    },

    async createOne(req, res){
       const { nombre, apellido, edad, email } = req.body
       try {
            const newUser = new User ({
                nombre, apellido, edad, email
        })
        const savedUser = await newUser.save()
        res.status(200).json({ success: true, message: "Se creo nuevo usuario", data: savedUser })
        } catch (error) {
            res.status(500).json({success: false, message: "Error en el servidor"})
        }
    },

    async updateOne(req,res){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new:true })
            if(!updatedUser) {
                return res.status(404).json({ success: false, message: "Usuario no existe" })
            }
            res.status(200).json({ success: false, message: "User updaated", data: updatedUser })
        } catch (error) {
            res.status(500).json({success: false, message: "Error en el servidor"})
        }
},
    async deleteOne(req, res){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if(!user) {
            return res.status(404).json({ success: false, message: "Usuario no existe" })
            }
            res.send(204)
        } catch (error) {
            res.status(500).json({success: false, message: "Error en el servidor"})
        }
    }
}