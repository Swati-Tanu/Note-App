const jwt = require("jsonwebtoken")

const authenticate = (req,res,next) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(decoded){
                // console.log(decoded.userID);
                const userID = decoded.userID //To create a relationship bet user and note
                req.body.userID = userID
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
        })
    }else{
        res.send({"msg":"Please Login"})
    }
}

module.exports={
    authenticate
}