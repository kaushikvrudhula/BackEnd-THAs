const check = (req,res,next) => {
    if(req.session.User.role === "Super-admin"){
        res.status(200).SEND('SUCESS');
    }
    else{
        res.status(401).send("Needs to be super admin")
    }

};
module.exports=check;