import express from "express"
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

//Create 
/* router.METHOD(path, [callback, ...] callback) */  

router.post("/",verifyAdmin, createHotel) // router.method() = Résultats de traduction Les méthodes router.METHOD() fournissent la fonctionnalité de routage dans Express, où METHOD est l'une des méthodes HTTP, telles que GET, PUT, POST, etc., en minuscules. Ainsi, les méthodes réelles sont router.get(), router.post(), router.put(), etc.

//Update
router.put("/:id", verifyAdmin, updateHotel)

//Delete

router.delete("/:id", verifyAdmin, deleteHotel)

//Get 

router.get("/:id", getHotel)

//Get All 

router.get("/", getHotels)

export default router 