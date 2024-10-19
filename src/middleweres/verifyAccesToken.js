
import jwt from "jsonwebtoken"
export const verifyAccesToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ success: false, message: "token invalido o a expirado" })
            req.decoded = decoded
            next()
    })
} else {
    res.status(401).json({ success: false, message: 'No se accedio al token' })
}

}