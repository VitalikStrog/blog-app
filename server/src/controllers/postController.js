import { postService } from '../services/postService.js';

async function getAllBlog(req, res) {
  const { search, filter } = req.query;
  const blogs =
    await postService.getAll({ search, filter });

  res.send(blogs);
}

async function createPost(req, res) {
  const { name, description, published  } = req.body;

  const newBlog = await postService.create({
    name,
    description,
    published,
  });

  res.send(newBlog);
}

async function editPost(req, res) {
  const { postId } = req.params;
  const { name, description, published } = req.body;

  await postService.edit({
    postId,
    name,
    description,
    published,
  });

  res.sendStatus(201);
}

async function deletePost(req, res) {
  const { postId } = req.params;

  const deletedPost = await postService.deletePost({ postId });

  res.send(deletedPost);
}

export const postController = {
  getAllBlog,
  createPost,
  editPost,
  deletePost,
};