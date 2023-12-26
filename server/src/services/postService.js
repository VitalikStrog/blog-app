import { v4 as uuidv4 } from "uuid"
import { Post } from '../models/Post.js';
import { ApiError } from '../exceptions/ApiError.js';
import { Op } from 'sequelize'

function normalize({id, name, description, published, createdAt, updatedAt}) {
  return {id, name, createdAt, updatedAt, published, description};
}

async function getAll({search = '', filter }) {
  const options = {
    where: {
      [Op.and]: [
        ...(filter && filter !== 'all') ? [{ published: filter === 'published' }] : [],
        {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`
              }
            },
            {
              description: {
                [Op.iLike]: `%${search}%`
              }
            }
          ]
        }
      ]
    }
  }

  const posts = await Post.findAll(options);

  return posts.map(normalize);
}

async function create({name, description, published}) {
  if (!name || !description || !published) {
    throw ApiError.BadRequest('Send full object model');
  }

  const id = uuidv4();
  const newPost = {
    id,
    name,
    description,
    published
  };

  await Post.create(newPost);

  return normalize(newPost);
}

async function edit({postId, name, description, published}) {
  console.log(postId, name, description, published);
  const post = await Post.findOne({
    where: {id: postId},
  });

  if (!post) {
    throw ApiError.BadRequest('Post does not exist');
  }

  if (!name || !description || typeof published !== 'boolean') {
    throw ApiError.BadRequest('Send full object model');
  }

  const updatedPost = await Post.update({
    name,
    description,
    published
  }, {where: {id: postId}});

  return normalize(updatedPost);
}

async function deletePost({postId}) {
  const post = await Post.findOne({
    where: {id: postId},
  });

  if (!post) {
    throw ApiError.BadRequest('Post does not exist');
  }

  await Post.destroy({
    where: {
      id: postId,
    },
  });
}

export const postService = {
  getAll,
  create,
  edit,
  deletePost,
};
