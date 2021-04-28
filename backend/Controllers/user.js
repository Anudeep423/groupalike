const User = require("../Models/user");

exports.CreateUser = (req,res) => {
    const user = new User(req.body);
    user.save( (err,user) => {
        if(err){
          return  res.json({ Error : "Cannot create user"  })
        }
        res.json({user})
    }   )


}

exports.CheckUserAndUpdate = (req,res,next) => {
    User.findOneAndUpdate(
        { name : req.body.name },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        next();
      }
      if(user){
          res.json({UpdatedUser : user})
      }
    } 
      );
} 

exports.getAllUsers = (req, res) => {
 
    User.find()
    .exec((err, users) => {
        if (err) {
          return res.status(400).json({
            error: "No userss found in DB"
          });
        }
        res.json(users);
      });
  };