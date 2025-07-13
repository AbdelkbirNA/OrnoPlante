const jwt = require("jsonwebtoken");
const JWT_SECRET= process.env.JWT_SECRET;

function verifyToken(req,res,next){
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({
            error: "Token manquant ou invalide" 
        })
    }

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token invalide" });
    }

}
module.exports = verifyToken;
