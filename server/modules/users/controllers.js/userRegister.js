const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userRegister = async(req, res)=>{

    const Users = mongoose.model("users");

    const {name, email, password} = req.body;


    const encryptedPassword = await bcrypt.hash(password, 10);

    try{
        if (!name) throw "Please input name!";
        if (!email) throw "Please input email!";
        if (!password) throw "Please input password!";
        await Users.create({
            name,
            email,
            password: encryptedPassword,
        })
    }catch(e){
        res.status(400).json({
            status: "Registration failed!",
            message: e
        })
        return;
    }

    res.status(200).json({
        status: "Registered!",
    })
}

module.exports = userRegister;