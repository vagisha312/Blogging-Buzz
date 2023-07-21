const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  accountVerificationCtrl,
 getbill,
 forgetPasswordToken,
 profilePhotoUploadCtrl,
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {photoUpload,profilePhotoResize,} = require("../../middlewares/uploads/photoUpload");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", authMiddleware, fetchUsersCtrl);
userRoutes.put("/profilephoto-upload",authMiddleware,photoUpload.single("image"),profilePhotoResize,profilePhotoUploadCtrl);
userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.put("/follow", authMiddleware, followingUserCtrl);
userRoutes.put("/unfollow", authMiddleware, unfollowUserCtrl);
userRoutes.put("/block-user/:id", authMiddleware, blockUserCtrl);
userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUserCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/:id", authMiddleware, updateUserCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);
//userRoutes.post("/user/signup",signup);
userRoutes.post("/product/getbill",authMiddleware,getbill);
userRoutes.put("/verify-account",  accountVerificationCtrl);
userRoutes.post("/forget-password-token",forgetPasswordToken);



module.exports = userRoutes;
