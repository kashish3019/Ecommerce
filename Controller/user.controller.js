const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/user.model");
const nodemailer = require("nodemailer");
const otpgenerator = require("otp-generator");
//signup
const getsignup = async (req, res) => {
    res.render("signup");
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
//login
const getlogin = async (req, res) => {
    res.render("login");
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

//logout
const logout = (req, res) => {
    res.clearCookie("token").send({ message: "Logout Successfull" })
}

//OTP for password reset
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kbpatel3019@gmail.com",
        pass: "sksgdkyazmqfsqji",
    },
});
let storedOTP = {};
const resetEmail = async (req, res) => {
    const { email } = req.body;
    storedOTP.otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })
    storedOTP.email = email
    const mailOption = {
        from: "kbpatel3019@gmail.com",
        to: email,
        subject: "Reset Your Password",
        html: `verify your OTP ${storedOTP.otp}</a>`,
    };
    transport.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err.message)
        }
        else {
            console.log(info)
        }
    })
    res.render("otp")
};
const otpform = (req, res) => {
    res.render("otp")
}
const otpverify = (req, res) => {
    let { otp } = req.body;
    console.log(otp, storedOTP);
    try {
        if (otp === storedOTP.otp) {
            res.render("reset")
        } else {
            res.send("Wrong OTP");
        }
    }
    catch (error) {
        res.send({ error: "error" })
    }
}

const forgot = (req, res) => {
    res.render("resetform")
}

const reset = async (req, res) => {
    try {
        const { newpassword, confirmpassword } = req.body;
        if (newpassword == confirmpassword) {
            let updatedata = await UserModel.findOne({ email: storedOTP.email })
            console.log("updatedata", updatedata);
            if (updatedata) {
                bcrypt.hash(newpassword, 5, async (err, hash) => {
                    if (err) {
                        return res.send({ error: err.message });
                    }
                    // let object = { password: hash }
                    // let data = await UserModel.findOneAndUpdate(object)
                    updatedata.password = hash

                    console.log("password", updatedata);
                    await updatedata.save()

                    return res.send(updatedata);
                })
            }
        }
        else {
            res.send("password not change")
        }
    }
    catch (error) {
        res.send({ error: "error" })
    }
}
module.exports = { forgot, reset, resetEmail, otpverify, otpform, logout, getlogin, getsignup, login, signup };