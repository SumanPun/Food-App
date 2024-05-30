const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickUp,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        } = req.body

        if(!title || !coords){
            return res.status(500).send({
                success: false,
                message: "Enter in title and address field"
            });
        }

        const newResturant = new resturantModel({title,
            imageUrl,
            foods,
            time,
            pickUp,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords})
            await newResturant.save();
            res.status(200).send({
                success: true,
                message: "new resturant created successfully"
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create resturant api",
            error
        })
    }
} 

const getResturantsController = async (req, res) => {
    try {
        const resturants = await resturantModel.find({});
        if(!resturants) {
            return res.status(404).send({
                success: false,
                message: "No resturants available"
            })
        }
        res.status(200).send({
            success: true,
            totalCounts: resturants.length,
            resturants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get resturant api",
            error
        })
    }
}

const getResturantByIdController = async (req,res) => {
    try {
        
        const resturants = await resturantModel.findById({_id:req.params.id});
        if(!resturants) {
            res.status(500).send({
                success: false,
                message: "Resturant did not found"
            })
        }
        res.status(200).send({
            success: true,
            resturants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get resturant api",
            error
        })
    }
}

const deleteResturantController = async (req,res) => {
    try {
        
        const resturant = await resturantModel.findById({_id:req.params.id});
        if(!resturant) {
            res.status(500).send({
                success: false,
                message: "Resturant did not found"
            })
        }
        await resturantModel.deleteOne(resturant);
        res.status(200).send({
            success: true,
            message: "resturant delete successfully "
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete resturant api",
            error
        })
    }
}


module.exports = {createResturantController, getResturantsController, getResturantByIdController, deleteResturantController}

