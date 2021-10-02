const mongoose = require('mongoose');

const NotificationSchema=new mongoose.Schema({

  //type 0 = hire, 
  //1 = apply
  // 2 = fire
  //4 = resign
    
  type:{ type: String},

    Answer:{ type: Boolean,default:false},
    cname: {type: String},
    cpname: {type: String},
    job: {type: String},
    jobtitle: {type: String},
    jemail: {type: String},
    Description:{type:String},
    email:{type: String},
    uid:{ type: String},

    jid:{ type: String},
    jname:{ type: String}
      
  });


NotificationSchema.index({ "$**": "text" });
  
const Notification=mongoose.model('Notification',NotificationSchema);
Notification.createIndexes();
module.exports ={
    Notification
};