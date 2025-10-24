 const Review=require("../models/review.js")
const Listing=require("../models/listing.js")
 


 module.exports.createReviews=async(req,res)=>{
  if(req.isAuthenticated()){
    let listing= await Listing.findById(req.params.id);
    let newreview=new Review(req.body.review)
    newreview.author=res.locals.currUser._id
   // newreview.author=req.user._id;
     listing.reviews.push(newreview);
     await newreview.save();
     await listing.save();
     req.flash("success","New Review created!")
     res.redirect(`/listings/${listing._id}`)
   }
 }


 
 module.exports.destroyReviews=async(req,res)=>{
  if(req.isAuthenticated()){
  
let {id,reviewId}=req.params; 
     let review= await Review.findById(reviewId)
if(review.author.equals(res.locals.currUser._id)){

   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
   await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted Succesfully!")
    res.redirect(`/listings/${id}`)
   }
  }
  }