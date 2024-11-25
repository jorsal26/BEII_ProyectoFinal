
const jwt = require("jsonwebtoken");
const passport = require('passport');

const PRIVATE_KEY = "myprivatekey"

const generateToken =(user)=>{
    return jwt.sign({user}, PRIVATE_KEY)
}

//Middleware para la ruta y validacion

const authToken =(req,res,next)=>{
    const token = req.headers["authorization"]
    if(token){
        jwt.verify(token, PRIVATE_KEY,(err,user)=>{
            if(err){
                res.sendStatus(403)
            }else{
                req.user = user
                next()
            }
        })
    }else{
        res.sendStatus(401)
    }
}

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
            req.user = user;
            next();
        })(req, res, next);
    }
}

module.exports={
    generateToken,
    authToken,
    passportCall
}