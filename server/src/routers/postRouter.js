import express from 'express';
import { postController } from '../controllers/postController.js';
import { catchError } from '../middlewares/catchError.js';

export const postRouter = new express.Router();

postRouter.get('/', catchError(postController.getAllBlog));
postRouter.post('/', catchError(postController.createPost));
postRouter.put('/:postId', catchError(postController.editPost));
postRouter.delete('/:postId', catchError(postController.deletePost));