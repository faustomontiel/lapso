import User from "../models/User"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import config from "../config";
import {validateRegisterInput,validateLoginInput} from "../utils/validators"
import {UserInputError} from "apollo-server"
import { json } from "stream/consumers";

function generateToken(user:any) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      config.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
}

export async function getUsers(){
    return await User.find()
}
    
export async function login(_:any,{username, password}:any) {

  try {
    let { errors, valid } = validateLoginInput(username, password);
    if (!valid) {
      throw new UserInputError('Errors', { errors });
    }

    const user = await User.findOne({ username });

    if (!user) {
      errors.generals = 'User not found';
      throw new UserInputError('User not found', { errors });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errors.generals = 'Wrong crendetials';
      throw new UserInputError('Wrong crendetials', { errors });
    }

    const token = generateToken(user);

    //return user
    return {
        email: user.email,
        username: user.username,
        id: user._id,
        token
    }
  } catch(err) {
    return err
  }

}

export async function register(_:any,{registerInput: { username, email, password, confirmPassword }}: any) {
    try{
        const {valid,errors} = validateRegisterInput(username, email, password, confirmPassword);
        if(!valid){
            console.log(valid)
            throw new UserInputError('Errors',errors);
        }

        const user = await User.findOne({username});

        if(user){
            throw new UserInputError('Username is taken',{
                errors:{
                    username: 'This username is taken'
                }
            })
        }

        password = await bcrypt.hash(password, 12);

        const newUser = new User({ email, username, password });
        const res = await newUser.save();

        const token = jwt.sign({
            id: res.id,
            email: res.email,
            username: res.username
        }, config.JWT_SECRET_KEY, { expiresIn: '1h' })

        return {
            email: res.email,
            username: res.username,
            id: res._id,
            token
        }
    }catch(err){
        return err
    }    
}