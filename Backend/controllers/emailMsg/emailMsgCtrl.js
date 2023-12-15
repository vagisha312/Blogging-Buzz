const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const EmailMsg = require("../../model/EmailMessaging/EmailMessaging");

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const { to, subject, message } = req.body;
  try {
    //buld up msg
    const msg = {
      to,
      subject,
      text: message,
      from: "twentekghana@gmail.com",
    };
    //send msg
    await sgMail.send(msg);
    //save to our db
    await EmailMsg.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      message,
      subject,
    });
    res.json("Mail sent");
  } catch (error) {
    res.json(error);
  }
});

module.exports = { sendEmailMsgCtrl };