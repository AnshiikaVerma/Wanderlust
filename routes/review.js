const express=require("express")
const router=express.Router({mergeParams:true});
//path requirement to prevent server crash
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema,reviewSchema}=require("../schema.js")
const Review=require("../models/review.js")
const Listing=require("../models/listing.js")
const {isLoggedIn,isOwner, isReviewAuthor}=require("../middleware.js")

const reviewController=require("../controllers/reviews.js")

//USE OF JOI VALIDATIONS -->created it as middleware and passed in routes
     
     //to validate reviews

const validateReview=(req,res,next)=>{
let result=  reviewSchema.validate(req.body); //through reviewSchema we r validating req.body 
let {error}=result;
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg)
  }else{
    next();
  }
}






//=================REVIEWS===============
       //post review
router.post("/",validateReview,isLoggedIn, wrapAsync(reviewController.createReviews))
  //delete review
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReviews))




  module.exports=router;