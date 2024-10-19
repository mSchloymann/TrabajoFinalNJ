import {mongoose} from "mongoose";
const UserAdmSchema = new mongoose.Schema(
    {
        fullName: {  type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
)

UserAdmSchema.set("toJSON", {
    transform(_doc, ret){
        delete ret.password
    }
})

const UserAdm = mongoose.model("UserAdm", UserAdmSchema)
export default UserAdm