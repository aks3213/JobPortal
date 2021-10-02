const mongoose = require('mongoose');

const FAQSchema=new mongoose.Schema({

    uid:{type:String},
    Question:{ type: String},
    Answer:{ type: String}
  /*  Answer: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Answer"
        }
      ]
//}, {
//    toJSON: {
//      virtuals: true,
        },*/
  });
  FAQSchema.index({ "$**": "text" });
  
const FAQ=mongoose.model('FAQ',FAQSchema);
FAQ.createIndexes();
module.exports ={
    FAQ
};