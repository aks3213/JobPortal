const express=require('express');

const cors = require('cors');
const  {mongoose}=require('./db/mongoose');

const bodyParser=require('body-parser');
const localStorage = require('node-localstorage');

const newEmail=require('./db/models/EmailNotification.js')

const {Job,User,Resume,FAQ,Notification,Ratting}=require('./db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app=express();

var multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

var server = app.listen(3000,()=>{
    console.log('Server is listening on 3000');
});

app.use(cors())
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

function getFileExtension(filename) {
    return filename.slice((Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1);
}

const storage = multer.diskStorage({

    destination: (req, file, callBack) => {
        callBack(null, '../JobPortal/src/assets/image')
    },
    filename: (req, file, callBack) => {

        var filename = file.originalname;

        var filefiletype = getFileExtension(filename)

        let token = req.header('x-access-token');
    
        jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
            if (err) {
                // there was an error
                // jwt is invalid - * DO NOT AUTHENTICATE *
                console.log(err);
                res.status(401).send(err);
            } else {
                //console.log("123");
                // jwt is valid
                req.user_id = decoded._id;//_id:  req.user_id

                callBack(null, `${req.user_id}.${filefiletype}`)
            }
        });

        
    }
  })

const upload = multer({ storage: storage })

const storagevideo = multer.diskStorage({

    destination: (req, file, callBack) => {
        callBack(null, '../JobPortal/src/assets/video')
    },
    filename: (req, file, callBack) => {

        var filename = file.originalname;

        var filefiletype = getFileExtension(filename)

        let token = req.header('x-access-token');
    
        jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
            if (err) {
                // there was an error
                // jwt is invalid - * DO NOT AUTHENTICATE *
                console.log(err);
                res.status(401).send(err);
            } else {
                //console.log("123");
                // jwt is valid
                req.user_id = decoded._id;//_id:  req.user_id

                callBack(null, `${req.user_id}.${filefiletype}`)
            }
        });

        
    }
  })

  const uploadvideo = multer({ storage: storagevideo })


let authenticate = (req, res, next) => {
    //console.log("in");
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        //console.log("in in");

        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            //console.log("in 3");

            res.status(401).send(err);
        } else {
            // jwt is valid
            //console.log("in 2");
            req.user_id = decoded._id;
            next();
        }
    });
}

let authenticateAdmin = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            User.findOne({_id:  req.user_id}).then(function(user){
                // Do something with the user
                if(user.usertype==0){
                  //  console.log("good to go");
                    next();
                }else{
                    res.status(401).send("not admin");
                }
            });
        }
    });
}

let authenticateEmployer = (req, res, next) => {

   // console.log(req.header);
    let token = req.header('x-access-token');
    //console.log(req.header('x-refresh-token'))
    //let token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE0ZjE5OTI3YTJmYjQxMmNkODVkZDgiLCJpYXQiOjE2MTE5OTkzMzgsImV4cCI6MTYxMjAwMDIzOH0.NrgwchAaGsP-70RE-kkJSXQ59SLyNXRaBwX4P2rcL6E";
     // let token = localStorage.getItem('x-access-token');
  // const token = req.headers["x-refresh-token"];

  // console.log(token);
    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            console.log(err);
            res.status(401).send(err);
        } else {
            console.log("123");
            // jwt is valid
            req.user_id = decoded._id;
            User.findOne({_id:  req.user_id}).then(function(user){
                // Do something with the user
                if(user.usertype==2){
                   // console.log("good to go");
                    next();
                }else{
                    res.status(401).send("not employer");
                }
            });
        }
    });
}

let authenticateJobSeeker = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            User.findOne({_id:  req.user_id}).then(function(user){
                // Do something with the user
                if(user.usertype==1){
                   // console.log("good to go");
                    next();
                }else{
                    res.status(401).send("not jobseeker");
                }
            });
        }
    });
}

let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }


        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}



/* route handlers */
app.get('/employer/jobs' , (req,res)=>{
    Job.find({}).then((jobs)=>{
        res.send(jobs);
    }).catch((e)=>{
        res.send(e);
    });
});

app.post('/employer/jobs',(req,res)=>{
 
    let newJob=new Job(req.body);

    console.log(newJob);

    newJob.save().then((jobDoc)=>{
        res.send(jobDoc);
    });
});

app.delete('/job/:id',(req,res)=>{
    // console.log("before");
     Job.findOneAndRemove({
         _id:req.params.id
     }).then((removedJobrDoc)=>{
         res.send(removedJobrDoc);
     });
 });

 app.get('/job/:uid',(req,res)=>{
    //let _id = req.body.id
   // console.log(_id)
    Job.find({"uid":req.params.uid}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    });
 });

 app.get('/jobs/:id',(req,res)=>{
    //let _id = req.body.id
   // console.log(_id)
    Job.find({"_id":req.params.id}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    });
 });


app.post('/job/search' , (req,res)=>{

    //let searchText = req.body.searchText
   // console.log(searchText)
    
   Job.find( { $text: { $search: req.body.searchText } } ).then((jobDoc)=>{
       // console.log("searchText1")
        res.send(jobDoc);
    }).catch((e)=>{
       // console.log(e)
        res.send(e).status(400);
    });

});


app.patch('/job/edit',(req,res)=>{
    console.log(req.body)
    Job.findOneAndUpdate({_id:req.body._id},{
        $set:req.body
    }).then(()=>{
        res.status(200).send({ status: 'OK'});
    }).catch((e)=>{
        res.send(e);
    });
});

app.get('/',( req, res )=>{
    res.send("hello123");
});

///////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/users', (req, res) => {
    // User sign up
    //console.log(req.body)
    let body = req.body;
    let emaill = req.body.user.email;
   // console.log(emaill)
    let newUser = new User(body.user);
    

  


    newUser.save().then(() => {

        const docc ={email:emaill};    
        let newRatting=new Ratting(docc);

        // console.log(newRatting);

        newRatting.save().then((RattingDoc)=>{
            // res.send(RattingDoc);

        }).catch((e)=>{
            console.log(e);
            res.send(e);
        });

        newEmail(emaill,"New Register","New Registration from your Account")
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        console.log(e)
        res.status(400).send(e);
    })
})

app.post('/users/loginEmployer', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let usertype=2;
    /*let email = req.body.email;
    let password = req.body.password;
    let usertype=req.body.usertype;*/
   // console.log(req.body);
    User.findByCredentials(email, password,usertype).then((user) => {
        newEmail(email,"New Login","New Login to your Account")
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user
            
            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.post('/users/loginJS', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let usertype=1;
   // console.log(req.body);
    User.findByCredentials(email, password,usertype).then((user) => {
        newEmail(email,"New Login","New Login to your Account")
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
                
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.post('/admins/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
   // let admin=req.params.admin;
   // console.log(admin);
    let usertype=0;
    User.findAdminByCredentials(email, password, usertype).then((user) => {
        newEmail(email,"New Login","New Login to your Account")
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.get('/employer/getuserid',(req,res,next)=>{

    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
           // console.log(req.user_id)
           // res.send(req.user_id)
            User.findOne({"_id":req.user_id}).then((users)=>{
                res.send(users);
            }).catch((e)=>{
                res.send(e);
            });
           // next();
        }
    });

})

app.get('/user/viewProfile', (req, res) => {
    
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            User.findOne({_id:  req.user_id}).then(function(user){
                
               res.send(user);
            }).catch((e)=>{
                res.send(e);
            })
        }
    });

})

app.post('/user/forgotpassword', (req,res)=>{

    let email = req.body.email;
    let question = req.body.question;
    let answer = req.body.answer;
    
    User.findOne({email,question,answer}).then((user)=>{
        if(!user){
            //console.log(e);
            res.status(400).send("error");
        }else{
            res.send(user);
        }
        
    }).catch((e)=>{
      //  console.log(e);
        res.status(400).send(e);
    });
})

app.post('/user/resetpassword', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    

    const passwordHash = bcrypt.hashSync(password, 10);

   // console.log("2 pa "+passwordHash);

    var myquery = { "email": email };
    var newvalues = { $set: {"password": passwordHash} };
    
    User.updateOne(myquery, newvalues,function(err, res) {
        newEmail(email,"Passedword chaged ","Your Password has been changed")
        if (err) throw err;
        //console.log("1 document updated");
      }).then((user)=>{

        res.send(user);
    }).catch((e)=>{
        console.log(e);
        res.status(400).send(e);
    });
})


app.post('/user/editprofile', (req,res)=>{
   // console.log(req.body)
    let body = req.body;
    let newUser = new User(body.user);
   // let email = newUser.email;
  // console.log(newUser.firstname)

  //  console.log(newUser)

   // var myquery = { "_id": newUser.id };
    var newvalues = { $set: {"firstname":newUser.firstname,"lastname":newUser.lastname,"email":newUser.email,
    "phone":newUser.phone,"question":newUser.question, "answer":newUser.answer,"gender":newUser.gender,"study":newUser.study } };

    var jnewvalues = { $set: {"accounttype":newUser.accounttype,"cname":newUser.cname,"email":newUser.email,
    "phone":newUser.phone,"question":newUser.question, "answer":newUser.answer,"cpname":newUser.cpname,"city":newUser.city,
    "designation":newUser.designation,"requirements":newUser.requirements,} };

    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            var myquery = { "_id": req.user_id };

            User.findOne({_id:  req.user_id}).then(function(user){
                // Do something with the user
                if(user.usertype==1){
                   // console.log("good to go");
                   // next();
                   User.updateOne(myquery, newvalues,function(err, res) {
                    if (err) throw err;
                   // console.log("1 document updated");
                    }).then((user)=>{
                        res.send(user);
                    }).catch((e)=>{
                        console.log(e);
                        res.status(400).send(e);
                    });
                }else if(user.usertype==2){
                   // res.status(401).send("not jobseeker");
                   User.updateOne(myquery, jnewvalues,function(err, res) {
                    if (err) throw err;
                    //console.log("1 document updated");
                    }).then((user)=>{
                        res.send(user);
                    }).catch((e)=>{
                       // console.log(e);
                        res.status(400).send(e);
                    });
                }
            });

            
        }
    });
    
})



app.get('/jbusers' , (req,res)=>{
    //let usertype = 1;
    User.find({"usertype":1}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    });
});

app.get('/eusers' , (req,res)=>{
    //let usertype = 2;
    User.find({"usertype":2}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    });
});

app.delete('/user/:id',(req,res)=>{
    // console.log("before");
     User.findOneAndRemove({
         _id:req.params.id
     }).then((removedUserDoc)=>{
         res.send(removedUserDoc);
     });
 });

 app.get('/user/:id',(req,res)=>{
    //let _id = req.body.id
   // console.log(_id)
    User.find({"_id":req.params.id}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    });
 });

 app.get('/userbyemail/:email',(req,res)=>{
    //let _id = req.body.id
   // console.log(_id)
    User.find({"email":req.params.email}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    });
 });


 app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
})

 app.patch('/user/image', upload.single('file'),(req,res,next)=>{

    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }

    const newimage = {
        image:file.filename
    }

    let token = req.header('x-access-token');
    
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            console.log(err);
            res.status(401).send(err);
        } else {
            //console.log("123");
            // jwt is valid
            req.user_id = decoded._id;//_id:  req.user_id
            User.findOneAndUpdate({_id:req.user_id},{$set:newimage}).then((doc)=>{
                //console.log(doc)
                res.send(file);
             }).catch((e)=>{
                 console.log(e)
                res.send(e);
            });
        }
    });

     
 })

 app.patch('/user/video', uploadvideo.single('file'),(req,res,next)=>{

    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }

    const newimage = {
        video:file.filename
    }

    let token = req.header('x-access-token');
    
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            console.log(err);
            res.status(401).send(err);
        } else {
            //console.log("123");
            // jwt is valid
            req.user_id = decoded._id;//_id:  req.user_id
            User.findOneAndUpdate({_id:req.user_id},{$set:newimage}).then((doc)=>{
                //console.log(doc)
                res.send(file);
             }).catch((e)=>{
                 console.log(e)
                res.send(e);
            });
        }
    });

     
 })
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 app.post('/resume/create',(req,res)=>{
    let newResume=new Resume(req.body);

    console.log(newResume);

    newResume.save().then((resumeDoc)=>{
        res.send(resumeDoc);
    });
 })


 app.get('/resume/view' , (req,res)=>{
    
    Resume.find({}).then((resumeDoc)=>{
        res.send(resumeDoc);
    }).catch((e)=>{
        res.send(e);
    });
});

app.get('/resume/:id' , (req,res)=>{
    
    Resume.find({_id:req.params.id}).then((resumeDoc)=>{
        res.send(resumeDoc);
    }).catch((e)=>{
        res.send(e);
    });
});

app.get('/resumes/:uid' , (req,res)=>{
    
    Resume.find({uid:req.params.uid}).then((resumeDoc)=>{
        res.send(resumeDoc);
    }).catch((e)=>{
        res.send(e);
    });
});

app.post('/resume/search' , (req,res)=>{

    //let searchText = req.body.searchText
   // console.log(searchText)
    
    Resume.find( { $text: { $search: req.body.searchText } } ).then((resumeDoc)=>{
      //  console.log("searchText1")
        res.send(resumeDoc);
    }).catch((e)=>{
        console.log(e)
        res.send(e).status(400);
    });

});

app.delete('/resume/:id',(req,res)=>{
    Resume.findOneAndRemove({
         _id:req.params.id
     }).then((removedUserDoc)=>{
         res.send(removedUserDoc);
     });
 });


app.patch('/resume/edit',(req,res)=>{
    console.log(req.body)
    Resume.findOneAndUpdate({_id:req.body._id},{
        $set:req.body
    }).then(()=>{
        res.status(200).send({ status: 'OK'});
    }).catch((e)=>{
        res.send(e);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/mailnotification',(req,res)=>{
    let email = req.body.email;
    let description = req.body.description;
    let subject = req.body.subject;
    newEmail(email,description,subject)
    
    res.send(email);

 })
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 app.post('/faq/question',(req,res)=>{
    let newFAQ=new FAQ(req.body);

    console.log(newFAQ);

    newFAQ.save().then((faqDoc)=>{
        res.send(faqDoc);
    });
 })

 app.get('/faq/answer' , (req,res)=>{
    //let usertype = 2;
    FAQ.find({}).then((faq)=>{
        res.send(faq);
    }).catch((e)=>{
        res.send(e);
    });
});


app.post('/faq/addanswer', (req,res)=>{
    let id = req.body._id;
    let answer = req.body.Answer;

    console.log(id,answer);

    var myquery = { "_id": id };
    var newvalues = { $set: {"Answer": answer} };
    
    FAQ.updateOne(myquery, newvalues,function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      }).then((faq)=>{

        res.send(faq);
    }).catch((e)=>{
        console.log(e);
        res.status(400).send(e);
    });
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/Notification/Hire',(req,res)=>{
    console.log(req.body);
    let newNotification=new Notification(req.body);

    console.log(newNotification);

    newNotification.save().then((NotificationDoc)=>{
        res.send(NotificationDoc);
    });
})

app.get('/Notification/:email' , (req,res)=>{
    //let usertype = 2;
    Notification.find({email:req.params.email}).then((NotificationDoc)=>{
        res.send(NotificationDoc);
    }).catch((e)=>{
        res.send(e);
    });
});



app.patch('/Notification/Accept',(req,res)=>{
   // console.log(req.body);
    let email = req.body.email;

    let jemail = req.body.jemail;
    let Answer = req.body.Answer;
    let jobid = req.body.job;

   // var newvacancy = {$set:{"vacancy":vacancy}}
    msg = email + " has Accepted your Job Offer";
   // console.log(msg)

   Notification.findOne({email,Answer}).then((NotificationDoc)=>{
    // console.log("0"+NotificationDoc);
    if(!NotificationDoc){

        Notification.findOne({jemail:email,Answer}).then((NotificationDoc)=>{
            if(!NotificationDoc){

                Job.findOne({_id:jobid,vacancy:{ $gt: 0 }}).then((NotificationDoc)=>{
                    // res.send(NotificationDoc);
                    if(NotificationDoc){
        
                        Notification.findOneAndUpdate({_id:req.body._id},{
                            $set:req.body
                        }).then(()=>{
            
                            Job.findOneAndUpdate({_id:jobid},{
                                $inc: { vacancy: -1 }
                            }).then(()=>{
                               // res.status(200).send({ status: 'OK'});
                            }).catch((e)=>{
                                res.send(e);
                            });
        
                            const newjob = {
                                job:jobid,current:1
                            }
        
                                    Ratting.findOneAndUpdate({email:email},{
                                        $push:{jobid:newjob}
                                    }).then(()=>{
                                    // res.status(200).send({ status: 'OK'});
                                    }).catch((e)=>{
                                        console.log(e);
                                        res.send(e);
                                    });

                                    Ratting.findOneAndUpdate({email:email},{
                                        $inc:{currentt: 1}
                                     }).then(()=>{
                                        //console.log(doc);
                                     // res.status(200).send({ status: 'OK'});
                                     }).catch((e)=>{
                                         console.log(e);
                                         res.send(e);
                                     });
        
                               
        
        
            
                            newEmail(jemail,"Job Accepted",msg)
                            res.status(200).send({ status: 'OKkkk'});
                        }).catch((e)=>{
                            console.log(e)
                            res.send(e);
                        });
                    }else{
                        res.status(400).send("empty");
                    }
                    
                    
                }).catch((e)=>{
                     res.send(e);
                });

            }else{
                res.status(400).send("onejob");
            }

        }).catch((e)=>{
            console.log(e)
            res.send(e);
        });

        

        

    }else{
        res.status(400).send("onejob");
    }
        


    }).catch((e)=>{
        console.log(e)
        res.send(e);
    });

})



app.post('/Notification/Apply',(req,res)=>{
    console.log(req.body);
    let newNotification=new Notification(req.body);

    console.log(newNotification);

    newNotification.save().then((NotificationDoc)=>{
        res.send(NotificationDoc);
    });
})

app.get('/Notification/Apply/:email' , (req,res)=>{
    //let usertype = 2;
    Notification.find({email:req.params.email}).then((NotificationDoc)=>{
        res.send(NotificationDoc);
    }).catch((e)=>{
        res.send(e);
    });
});

app.get('/Notification/MyEmployes/:email' , (req,res)=>{
    //let usertype = 2;
    Notification.find({job:req.params.email,Answer:true}).then((NotificationDoc)=>{
        res.send(NotificationDoc);
    }).catch((e)=>{
        res.send(e);
    });
});


app.patch('/Notification/AcceptApply',(req,res)=>{
    // console.log(req.body);
     let jemail = req.body.jemail;
    // console.log(jemail)
     let email = req.body.email;
     let Answer = req.body.Answer;
     let jobbid = req.body.job;
     msg = email + " has Accepted you for Job";
    // console.log(msg)
 
    Notification.findOne({jemail,Answer}).then((NotificationDoc)=>{
        // console.log("1"+NotificationDoc);
     if(!NotificationDoc){

        Notification.findOne({email:jemail,Answer}).then((NotificationDoc)=>{
            // console.log("1"+NotificationDoc);
         if(!NotificationDoc){

            Job.findOne({_id:jobbid,vacancy:{ $gt: 0 }}).then((NotificationDoc)=>{
                // res.send(NotificationDoc);
     
                if(NotificationDoc){
     
                     Notification.findOneAndUpdate({_id:req.body._id},{
                         $set:req.body
                     }).then(()=>{
     
                         Job.findOneAndUpdate({_id:jobbid},{
                             $inc: { vacancy: -1 }
                         }).then(()=>{
                         // res.status(200).send({ status: 'OK'});
                         }).catch((e)=>{
                             res.send(e);
                         });
     
                        
                         

                        const newjob = {
                                job:jobbid,current:1
                        }
                       // $push: { Ratting: req.body.Ratting } 
                                 Ratting.findOneAndUpdate({email:jemail},{
                                    $push:{jobid:newjob}
                                 }).then(()=>{
                                   
                                 // res.status(200).send({ status: 'OK'});
                                 }).catch((e)=>{
                                     console.log(e);
                                     res.send(e);
                                 });

                                 Ratting.findOneAndUpdate({email:jemail},{
                                    $inc:{currentt: 1}
                                 }).then(()=>{
                                    //console.log(doc);
                                 // res.status(200).send({ status: 'OK'});
                                 }).catch((e)=>{
                                     console.log(e);
                                     res.send(e);
                                 });
     
                             
     
     
                         newEmail(jemail,"You Selected",msg)
                         res.status(200).send({ status: 'OK'});
     
                     }).catch((e)=>{
                         console.log(e)
                         res.send(e);
                     });
                }else{
                 res.status(400).send("empty");
                }
                
     
             }).catch((e)=>{
                 res.send(e);
             });


         }else{
            res.status(400).send("onejob");
        }

        }).catch((e)=>{
            console.log(e)
            res.send(e);
        });

     }else{
         res.status(400).send("onejob");
     }

     }).catch((e)=>{
         console.log(e)
         res.send(e);
     });
 
 })
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.patch('/ratting/update/:email',(req,res)=>{

   // console.log(req.body)

    const newrate = {
        rate:req.body.Ratting,id:req.body.uid
    }

    Ratting.updateOne(
        { email:req.params.email, "Ratting.id": req.body.uid },
        { $set: { "Ratting.$.rate" : req.body.Ratting } }
    ).then((doc)=>{

        //console.log(doc.n)
        if(doc.n==0){

            Ratting.findOneAndUpdate({email:req.params.email},{
        
                $push:{Ratting:newrate}
        
            }).then((doc)=>{
               // res.send(doc);
            }).catch((e)=>{
                console.log(e)
                res.send(e);
            })
        }
        res.send(doc);
    }).catch((e)=>{
        console.log(e)
        res.send(e);
    });

/*    Ratting.findOneAndUpdate({email:req.params.email},{
        
        $push:{Ratting:newrate}

    }).then((doc)=>{
        res.send(doc);
    }).catch((e)=>{
        console.log(e)
        res.send(e);
    });*/
})

app.get('/ratting/get',(req,res)=>{
    Ratting.aggregate([{ $project: {email:'$email', RattingAvg: { $avg: "$Ratting.rate"} } }]).then((rattingDoc)=>{
        res.send(rattingDoc);
    }).catch((e)=>{
        console.log(e)
        res.send(e);
    });
})

app.get('/ratting/viewjobs/:email',(req,res)=>{
    /*Ratting.aggregate([{ $project: {email:'$email', jobs:'$jobid'  } }]).then((rattingDoc)=>{
        res.send(rattingDoc);
    }).catch((e)=>{
        res.send(e);//6030adb0c8b7eb2d48f43f34
        //6031d4229ecefd2244a298d2
    });*/

    Ratting.findOne({email:req.params.email}).then((rattingDoc)=>{
        res.send(rattingDoc);
    }).catch((e)=>{
        res.send(e);//6030adb0c8b7eb2d48f43f34
        //6031d4229ecefd2244a298d2
    });
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/home/resume',(req,res)=>{
    Resume.find({}).sort({_id:-1}).limit(1).then((Doc)=>{
        res.send(Doc);
    }).catch((e)=>{
        console.log(e)
        res.send(e);//6030adb0c8b7eb2d48f43f34
        //6031d4229ecefd2244a298d2
    });
})

app.get('/home/job',(req,res)=>{
    Job.find({}).sort({$natural:-1}).limit(2).then((Doc)=>{
        res.send(Doc);
    }).catch((e)=>{
        console.log(e)
        res.send(e);//6030adb0c8b7eb2d48f43f34
        //6031d4229ecefd2244a298d2
    });
})

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 app.post('/test',(req,res)=>{

    //let id = req.body.id;
   let email = req.body.email

    const doc ={email:email,Ratting:4};    
    let newRatting=new Ratting(doc);

    console.log(newRatting);

    newRatting.save().then((RattingDoc)=>{
        
        res.send(RattingDoc);

    }).catch((e)=>{
        console.log(e);
        res.send(e);
    });

    
})