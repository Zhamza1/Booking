import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser";


const app =express();
dotenv.config();

mongoose.connect(process.env.MONGO ,)         /* Pour se connecter à la base de donnée mongoDB et c'est le .connect qui renvoie une promise | The process.env property returns an object containing the user environment. See environ(7).   */
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected")
})
 
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})

//middlewares              //APP.use= Monte la ou les fonctions middleware spécifiées sur le chemin spécifié : la fonction middleware est exécutée lorsque la base du chemin demandé correspond au chemin.
app.use(cookieParser())    
app.use(express.json())   //par défaut on peut pas envoyer de requete json donc on utilise sa  for parsing application/json et permet d'utiliser req.body 

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {    //.listen = Lie et écoute les connexions sur l'hôte et le port spécifiés. Cette méthode est identique à http.Server.listen() de Node. Si le port est omis ou vaut 0, le système d'exploitation attribuera un port inutilisé arbitraire, ce qui est utile pour des cas tels que des tâches automatisées (tests, etc.).
    console.log("Connected to backend")
})



/* const connect = async () => {      //fonxtionne pas jsp pk
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("vous etes bien connecté")
  } catch (error) {
    throw(error)
  }
}


 */
