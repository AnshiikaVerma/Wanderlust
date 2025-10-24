const mongoose=require("mongoose");
const Schema=mongoose.Schema; //just becoz we don't want to write mongoose.schema again
const Review=require("./review.js")
const listingSchema=new Schema({
    title:{
       type: String,
       required:true

    },
    description:String,
    image:{
       
//         // filename:{
//             type:String,
//         // },
       
//         // url:{
//         //     type:String,
//                //img ka link exist nhi  kr rha
//         default:"https://plus.unsplash.com/premium_photo-1698342931398-84352ce5ca20?q=80&w=1133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// set:(v)=>
//     v===""//img to h lekin uska link  empty h
//      ?"https://plus.unsplash.com/premium_photo-1665311515537-42ce402ac432?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" :v,
//         // }
     url:String,
     filename:String,


    },

    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing.reviews.length){
    await Review.deleteMany({_id:{$in:listing.reviews}})
}
})

const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;