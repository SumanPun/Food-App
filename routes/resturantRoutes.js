const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getResturantsController, getResturantByIdController, deleteResturantController } = require('../controllers/resturantController');

const router = express.Router();


//routes
//register resturant
router.post("/create",authMiddleware, createResturantController);

//get resturant
router.get("/getAll",getResturantsController);

//get resturant by id
router.get("/get/:id",getResturantByIdController);

//delete resturant by id
router.delete("/delete/:id",deleteResturantController);



module.exports = router;