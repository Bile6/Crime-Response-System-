import User from "../models/users.js";
import jwt from 'jsonwebtoken';
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);


export const createUser = async (req, res) => {
    const { username, email, password, type } = req.body; // Include type here
    
    // Check for required fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Fill all the fields" });
    }



    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userType = type ? type : 'user'; 
        const newUser = new User({ username, email, password: hashedPassword, type: userType });

        await newUser.save();
        res.status(200).json({ success: true, message: "Saved successfully!" });
    } catch (error) {
        console.error("error creating user", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const getUsers =  async (req, res) => {
    try {
        const  users = await User.find({});
        res.status(200).json({data: users});
    } catch (error) {
        console.log("error getting users", error.message);
        res.status(500).json({message: "server error"});
    }
};

export const deleteUser = async (req, res)=> {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "sucess delete!"});
    } catch (error) {
        console.log("error in deleting", error.message);
        res.status(404).json({message: "user not found"});
        
    }
};


export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await User.findOne({ username });
        const decryptPassword = await bcrypt.compare(password, user.password);

        if (!user || !decryptPassword) { 
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Send the token and role as response
        res.status(200).json({ token, role: user.type , user: user.username, user_id:user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getUserRole = async (req, res) => {
    // const user = req.body;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("type");

        if (!user){
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json({role: user.type});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Server error"});
        
    }
};



export const updateUser = async (req, res) => {
    const  id  = req.params.id;
    const { username, email, password } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user fields
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password; // In production, hash the password before saving
  
      const updatedUser = await user.save();
      res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  };

  export const getUserByType = async (req, res) => {
    const type = req.params.type;
    try {
        const users = await User.find({ type }).select("username _id");
        res.status(200).json({data: users});
        console.log(users);
    } catch (error) {
        console.log("error fetching users by type", error);
        res.status(500).json({message: "Server error"});
        
    }
  };


  export const get_image = async (req, res) => {
    const { id } = req.params; 
    const filePath = path.resolve('uploads', id);
  
  
  
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      // Send the image file
      res.sendFile(filePath);
    });
  };