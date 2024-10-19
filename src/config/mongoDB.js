import { connect } from "mongoose";
async function main(){
    await connect('mongodb://localhost:27017')
}
main()
.then(() => console.log("MongoDB se conecto al local"))
.catch(err => console.log(`fallo la coneccion a la Base de Datos: ${err.message}`))