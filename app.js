//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("subscribe");
});

app.post("/", function(req, res) {
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            /* Don't forget to head over to https://myaccount.google.com/lesssecureapps and switch it on */
            user: "",
            /* Write Email (Must Be Gmail) */
            pass: "" /* Write PAssword */
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailInfo = {
        from: "",
        /* Write Email */
        to: email,
        subject: "Thanks",
        /* Email Subject */
        text: "Thanks for subscribing to our newsletter",
        /* Email Text */
        attachments: [{
            filename: "logo.png",
            path: __dirname + "/logo.png"
        }] /* Email Attachments */
    }

    transporter.sendMail(mailInfo, (error, info) => {
        if (error) {
            console.log("Error", error);
        } else {
            console.log("Info", info)
        }
    });

    res.redirect("/");
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});