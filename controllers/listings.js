 const Listing=require("../models/listing.js")
 





module.exports.index=async(req,res)=>{
    const allListings= await Listing.find({})// if await nhi krte to promise return hota list nhi
    res.render("listings/index.ejs",{allListings})
};



module.exports.renderNewForm=(req,res,next)=>{
if(req.isAuthenticated()){
 res.render("listings/new.ejs") 
}     
}



module.exports.showListings=async(req,res,next)=>{
let {id}=req.params;
let listing= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
if(!listing){
    req.flash("error"," Listing you requested for does not exist!") 
    res.redirect("/listings")
}
else{
res.render("listings/show.ejs",{listing})
}
console.log(listing)
}




module.exports.createListings=async(req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  //listing obj aega
    let listing=req.body.listing;
   // making new instance with that values in db
  const newListing=new Listing(listing)
  newListing.owner=req.user._id; //currentUser h
  newListing.image={url,filename};
   await newListing.save();
   req.flash("success","New Listing created!")
   res.redirect("/listings")
}


//we getour edit form through this,edit form me img preview krana h
module.exports.renderEditForm=async(req,res,next)=>{
  let {id}=req.params;
   let listing= await Listing.findById(id); 
   if(listing.owner.equals(res.locals.currUser._id)){
if(!listing){
    req.flash("error"," Listing you requested for does not exist!") 
    res.redirect("/listings")
}else{
  let originalImgUrl=listing.image.url;
originalImgUrl =originalImgUrl.replace("/upload","/upload/w_250")
res.render("listings/edit.ejs",{listing,originalImgUrl})
}
}}



module.exports.updateListings=async(req,res,next)=>{
    let {id}=req.params; 
    let listing= await Listing.findById(id)
    if(listing.owner.equals(res.locals.currUser._id)){ 
   let listinG=await Listing.findByIdAndUpdate(id,{...req.body.listing});

  //  condn of undefined is checked becoz may be user is not reuploading the file during edit in that case req.file will be undefined,if user is not editing ,then everything should be as it is 
if( typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listinG.image={url,filename};
        await listinG.save();
   }
   
   req.flash("success"," Listing updated!")
  res.redirect(`/listings/${id}`)
    }
}



module.exports.destroyListings=async(req,res,next)=>{
  let {id}=req.params;
   let listing= await Listing.findById(id)
    if(listing.owner.equals(res.locals.currUser._id)){
 let deletedListing=await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted Successfully!")
  res.redirect("/listings")
  console.log(deletedListing)
    }
 
}