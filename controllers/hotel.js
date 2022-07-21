import Hotel from "../models/Hotel.js"

export const createHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body)        //req.body = Contient des paires clé-valeur de données soumises dans le corps de la requête. Par défaut, il n'est pas défini et est rempli lorsque vous utilisez un middleware d'analyse de corps tel que express.json() ou express.urlencoded().
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err) {
        next(err)
    }
}

export const updateHotel = async (req,res,next) => {
    try{                                                             //A.findByIdAndUpdate(id, update, options, callback)
        const updateHotel = await Hotel.findByIdAndUpdate(          //.findByIdAndUpdate = Recherche un document correspondant, le met à jour en fonction de l'argument de mise à jour, en transmettant toutes les options, et renvoie le document trouvé (le cas échéant) au rappel. La requête s'exécute si le rappel est passé.
            req.params.id, 
            { $set: req.body},
            {new:true}
            )
        res.status(200).json(savedHotel)
    }catch(err) {
        next(err)
    }
}

export const deleteHotel = async (req,res,next) => {
    try{
        await Hotel.findByIdAndDelete(
            req.params.id, 
            )
        res.status(200).json("Hotel has been deleted")
    }catch(err) {
        next(err)
    }
}

export const getHotel = async (req,res,next) => {
    try{
        const hotel = await Hotel.findById(
            req.params.id, 
            )
        res.status(200).json(hotel)
    }catch(err) {
        next(err)
    }
}

export const getHotels = async (req,res,next) => {
    /* const failed = true test error.js */
    /* if (failed) return next(createError(401,"You are not authenticated")) Pour test le truc erros.js  */ 
    try{
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    }catch(err) {
        next(err)
    }
}