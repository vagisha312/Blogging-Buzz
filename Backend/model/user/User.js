const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, "First name is required"],
      type: String,
    },
    lastName: {
      required: [true, "Last name is required"],
      type: String,
    },
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Hei buddy Password is required"],
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Blogger"],
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: { type: Boolean, default: false },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,

    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    passwordChangeAt: Date,
    passwordRessetToken: String,
    passwordResetExpires: Date,

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

//Account Type
userSchema.virtual("accountType").get(function(){
  const totalFollowers=this.followers?.length;
  return totalFollowers>= 10 ? "Pro Account":"Starter Account";
});

//hashing
userSchema.pre("save",async function(next){          // This line registers a pre-save middleware function for the "save" event in the user schema. It means that this function will be executed automatically just before saving a user object to the database.
  const salt=await bcrypt.genSalt(10);                        //This line generates a salt using the bcrypt library. A salt is a random string used as an additional input during the hashing process to increase the security of the password. The genSalt function takes a cost factor as an argument, which determines the computational complexity of the hashing algorithm. In this case, the cost factor is set to 10.
  this.password=await bcrypt.hash(this.password, salt);       //This line hashes the user's password using the bcrypt library. The hash function takes two arguments: the password to be hashed (this.password in this case) and the generated salt. It returns a hash of the password. The hashed password is then assigned to this.password, which will be saved to the database.
  next();                                                   //his line calls the next function to proceed to the next middleware or save operation. It allows the execution flow to continue after the pre-save middleware has finished its tasks
});

//match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Verify account
userSchema.methods.createAccountVerificationToken = async function () {
  //create a token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.accountVerificationTokenExpires = Date.now() + 1 * 60 * 1000; //10 minutes
  return verificationToken;
};


//forget password token 
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes



  
  return resetToken;
};


//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;



