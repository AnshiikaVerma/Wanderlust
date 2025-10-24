//data initialisation complete logic


const mongoose=require('mongoose'); 
const initdata=require("./data.js") //initData will be obj having key as data
const Listing=require("../models/listing.js") //schema

main().then(()=>{
    console.log("connection to db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({ ...obj,owner:'68e13bb7962bf013f433790a'}))
     await Listing.insertMany(initdata.data);
     console.log("data was initialised");

};
initDB();