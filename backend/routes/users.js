import express from 'express';
import { createUser, deleteUser, get_image, getUserByType, getUserRole, getUsers, loginUser, updateUser } from '../controllers/users.js';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/user.js';
const router = express.Router;


router.post("/add", createUser);
router.post("/login", loginUser);
router.get("/all", getUsers);

router.get("/role", authenticate, getUserRole);

//Delete user
router.delete("/:id", deleteUser)

// PUT endpoint to update a user by ID
router.put('/:id', updateUser);

router.get("/type/:type", getUserByType);

router.get("/get_image/uploads/:id", get_image);



export default router;
