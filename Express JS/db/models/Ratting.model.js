const mongoose = require('mongoose');

const RattingSchema=new mongoose.Schema({

  email:{type:String},
  Ratting:[{rate:Number,id:String}],
  jobid:[{job:String,current:Number}],

  //0 default
  //1 doing job
  //2 left job
  //4 employer
  currentt:{type:Number,default:0}
      
});


 
  
const Ratting=mongoose.model('Ratting',RattingSchema);

module.exports ={
    Ratting
};