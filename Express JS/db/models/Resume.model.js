const mongoose = require('mongoose');

const ResumeSchema=new mongoose.Schema({
  uid:String,
    Name:{ type: String},
    CurrentCity:{ type: String},
    Current2ndCity:{ type: String},
    contactNo:{ type: String},
    email:{ type: String,unique: true},

    YearOfCompletionItermediate:{ type: String},
    BoardItermediate:{ type: String},
    PerformanceItermediate:{ type: String},
    SchoolNameItermediate:{ type: String},

    StreamMatriculation:{ type: String},
    SchoolNameMatriculation:{ type: String},
    YearOfCompletionMatriculation:{ type: String},
    BoardMatriculation:{ type: String},
    PerformanceMatriculation:{ type: String},

    Graduationstatus:String,
  College:String,
  Startyear:String,
  Endyear:String,
  Degree:String,
  Performance:String,

  Profile:String,
  Organization:String,
  Location:String,
  Startdate:Date,
  Enddate:Date,
  Description:String,
  Currently : Boolean,

  iProfile:String,
  iOrganization:String,
  iLocation:String,
  iStartdate:Date,
  iEnddate:Date,
  iDescription:String,
  iCurrently : Boolean,

  Title:String,
  Startmonth:Date,
  Endmonth:Date,
  pDescription:String,
  Projectlink : String,
  pCurrently: Boolean,

  Skill1:String,
  Skill2:String,
  Skill3:String,
  level1:String,
  level2:String,
  level3:String
});
ResumeSchema.index({ "$**": "text" });
//Resume.createIndexes();
const Resume=mongoose.model('Resume',ResumeSchema);
//ResumeSchema.index({ "$**": "text" });
Resume.createIndexes(); 
module.exports ={
    Resume
};