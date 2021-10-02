const mongoose = require('mongoose');

const JobSchema=new mongoose.Schema({
    uid:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    longdescription:{
        type:String
    },
    minexperience:{
        type:String
    },
    maxexperience:{
        type:String
    },
    minsalary:{
        type:String
    },
    maxsalary:{
        type:String
    },
    location:{
        type:String
    },
    minqualification:{
        type:String
    },
    cname:{
        type:String
    },
    cpname:{
        type:String
    },
    phone:{
        type:Number
    },
    vacancy:{
        type:Number
    }
});
JobSchema.index({ "$**": "text" });

const Job=mongoose.model('Job',JobSchema);
Job.createIndexes();
module.exports ={
    Job
};