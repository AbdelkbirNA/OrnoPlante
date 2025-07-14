const verifyToken = require('./verifyToken');

function isAdmin(req,res,next){
    const user=req.user;
if(user&&user.type=='admin'){
    return next();
}
return res.status(403).json({ message: "Accès refusé, admin uniquement" });
}