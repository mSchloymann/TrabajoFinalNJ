import { mongoose } from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        apellido: {
            type: String,
            required: true,
            trim: true
        },
        edad: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
    }, {

    timestamps: true
   
})

const User = mongoose.model("User", UserSchema)
export default User