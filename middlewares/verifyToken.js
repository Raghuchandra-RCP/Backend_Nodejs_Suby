

const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');

const dotEnv=require('dotenv');
dotEnv.config();

const secretkey = process.env.whatIsYourName


const verifyToken = async(req,res,next) => {

    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error: "token is required"});
    }
    try {
        const decoded = jwt.verify(token, secretkey)
        const vendor = await Vendor.findById(decoded.vendorId);

        if(!vendor){
            return res.status(404).json({error : "vendor not found"})
        }

        req.vendorId = vendor._id

        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        
    }
}

module.exports = verifyToken