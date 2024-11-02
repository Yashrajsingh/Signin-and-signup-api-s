// controllers/auth.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorhandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validuser = await User.findOne({ email });
    if (!validuser) return next(errorhandler(404, "User not found"));

    const isPasswordValid = bcrypt.compareSync(password, validuser.password);
    if (!isPasswordValid) return next(errorhandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const { password:pass,...rest } = validuser._doc
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req,res,next) => {
    try{
        const user = await User.findOne({ email:req.body.email })
        if(user){
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)
            const {password:pass,...rest} = user._doc
            res
               .cookie('access_token', token, { httpOnly:true })
               .status(200)
               .json(rest)
        } else {
            const generatedpassword = Math.random().toString(36).slice(-8)
            const hashedPassword = bcrypt.hashSync(generatedpassword,10)
            const newuser = new User({username : req.body.name.split(" ").join(" ").toLowerCase() + Math.random().toString(36).slice(-4),
                                      email : req.body.email , 
                                      password: hashedPassword, 
                                      avatar : req.body.photo})
            await newuser.save()
            const token = jwt.sign({id:newuser._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest } = newuser._doc
            res
            .cookie('access_token', token, { httpOnly:true })
            .status(200)
            .json(rest)
        }
    } catch(error) {
        next(error)
    }
}