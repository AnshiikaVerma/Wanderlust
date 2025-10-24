const express=require("express")
const router=express.Router();
//path requirement to prevent server crash
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema,reviewSchema}=require("../schema.js")
const {isLoggedIn,isOwner}=require("../middleware.js")
     //----------requiring listings controllers------
const listingController=require("../controllers/listings.js")
      

                // for our files to get upload

const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })






//USE OF JOI VALIDATIONS -->created it as middleware and passed in routes
 //to validate listing
const validateListing=(req,res,next)=>{
let result=  listingSchema.validate(req.body);
let {error}=result;
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg)
  }else{
    next();
  }
}

 

//index route
router.get("/", wrapAsync(listingController.index))


//New route form {IS ROUTE KO :ID WALE ROUTE SE UPR RKHNA H WARNA {NEW} :ID KI TRH TREAT HOGA AND ERROR MILEGI }
router.get("/new",isLoggedIn,listingController.renderNewForm)

//show route --->to read data of individual listing
router.get("/:id" ,wrapAsync(listingController.showListings))



//CREATE ROUTE post listing
router.post("/",isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListings))


//edit form ,edit form will render
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))

//-------------------update route-------------------
router.put("/:id" ,isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListings))

//DESTROY ROUTE

router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListings))

module.exports=router;