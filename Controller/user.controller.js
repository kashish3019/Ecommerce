const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/user.model");
const nodemailer = require("nodemailer");
const otpgenerate = require("otp-generator");

const getsignup = async (req, res) => {
    res.render("signup");
}

const getlogin = async (req, res) => {
    res.render("login");
}

const signup = async (req, res) => {
    let { email, password, username, role } = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
            res.send({ msg: "Error" });
        } else {
            let obj = {
                email,
                password: hash,
                username,
                role,
            };
            let data = await UserModel.create(obj);
            let token = jwt.sign({ id: data._id, role: data.role }, "token");
            res.cookie("token", token).send({ msg: "User Signup", val: data });
        }
    });
}


const login = async (req, res) => {
    const { email, password } = req.body;
    let data = await UserModel.findOne({ email });
    if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ id: data._id, role: data.role }, "token");
                res.cookie("token", token).send({ msg: "User login successfully" });
            } else {
                res.send({ msg: "Password incorrect" });
            }
        });
    } else {
        res.send({ msg: "User not registered" });
    }
}



const getusers = async (req, res) => {
    console.log(req.user);
    res.send({ msg: "checking token" });
}

//OTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kbpatel3019@gmail.com",
        pass: "sksgdkyazmqfsqji",
    },
});
let storedToken = "";
const sendResetEmail = async (email) => {
    storedToken = otpgenerate.generate(6, {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
    });

    const mailOptions = {
        from: "kbpatel3019@gmail.com",
        to: email,
        subject: "Reset Your Password",
        html: `<a href="http://localhost:8090/user/verify/${storedToken}">Click to verify your OTP ${storedToken}</a>`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(info);
            }
        });
    });
};

const reset = async (req, res) => {
    const { email } = req.body;

    try {
        await sendResetEmail(email);
        res.send("OTP send to your email");
    } catch (error) {
        res.status(500).send( error);
    }
};

const resett = (req, res) => {
    res.render("reset");
};

const verify = async (req, res) => {
    let { token } = req.params;
    if (token === storedToken) {
        res.render("passwordResetForm", { token });
    } else {
        res.send("Wrong OTP. Unable to reset the password.");
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await UserModel.findOneAndUpdate({ resetToken: token }, { password: newPassword });
        storedToken = "";

        res.send("Password reset successfully.");
    } catch (error) {
        res.status(500).send("Error resetting password: " + error);
    }
};

module.exports = {verify, resetPassword,reset,resett,verify, getlogin, getsignup, login, signup, getusers };