import express from 'express'
import { test, updateUser, deleteUser, signout, getUsers, getUser, getBookmarks, addBookmark, removeBookmark } from '../controllers/User.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

// Bookmark routes
router.post('/:userId/bookmark/:postId', verifyToken, addBookmark);
router.delete('/:userId/bookmark/:postId', verifyToken, removeBookmark);
router.get('/:userId/bookmarks', verifyToken, getBookmarks);

export default router;