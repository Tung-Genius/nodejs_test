

const User = require('../models/userModel'); 

// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const signup = async (req, res) => {
    const formData = req.body;
    formData.password = bcrypt.hashSync(formData.password);
    const user = new User(formData);
    user.save();
    res.status(200).json({
        success: true,
        message: 'Signup success!',
        user: user,
    });
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email: email });
        if(!user){
            res.status(401).json({
                success: false,
                message: "Login fails",
                error: "Email doesn't find",
            });
            return;
        }
        else{
            bcrypt.compare(password, user.password, ( error, match ) => {
                if(error){
                    res.status(500).json(error);
                }else if(match){
                    res.status(200).json({
                        success: true,
                        message: "Login success",
                        user: user,
                    });
                    return;
                }
                else{
                    res.status(401).json({
                        success: false,
                        message: "Login fails",
                        error: "Passwords don't math",
                    });
                    return;
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error,
        });
    }
}

module.exports = {signup, login};