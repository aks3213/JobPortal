//handles connection to mongoDB db

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:Admin123@cluster0.i6rib.mongodb.net/jobportal_db',{useNewUrlParser:true, useUnifiedTopology: true }).then( ()=>{
    console.log("Database connected ");
}).catch((e)=>{
    console.log("error =>\n"+e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);
S
module.exports={
    mongoose
};

