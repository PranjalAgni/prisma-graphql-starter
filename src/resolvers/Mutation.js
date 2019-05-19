import uuidv4 from 'uuid/v4';
import { type } from 'os';
import { log } from 'util';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(user => {
      return user.email === args.data.email;
    });

    if (emailTaken) {
      throw new Error('Email already exists');
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userExists = db.users.findIndex(user => {
      return user.id === args.id;
    });

    console.log(userExists);
    if (userExists === -1) {
      throw new Error('User does not exists');
    }

    const deletedUser = db.users.splice(userExists, 1);

    db.posts.filter(post => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter(comment => {
          return comment.id !== post.id;
        });
      }

      return !match;
    });

    return deletedUser[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find(user => {
      return user.id === id;
    });

    if (!user) {
      throw new Error('User does not exists');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.find(user => {
        return user.email === data.email;
      });

      if (emailTaken) {
        throw new Error('Email Taken');
      }

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
  },
  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => {
      return user.id === args.post.author;
    });

    if (!userExists) {
      throw new Error('User does not exists');
    }

    const post = {
      id: uuidv4(),
      ...args.post
    };
    if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      });
    }
    return post;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.find(post => {
      return post.id === args.id && post.published;
    });

    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedPosts = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => {
      return comment.post != args.id;
    });

    if (deletedPosts[0]) {
      pubsub.publish('post', {
        mutation: 'DELETED',
        data: deletedPosts[0]
      });
    }

    return deletedPosts[0];
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const post = db.posts.find(post => post.id === args.id);
    const orignalPost = { ...post };

    if (!post) {
      throw new Error('Post is undefined');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;
      if (orignalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'Deleted',
            data: orignalPost
          }
        });
      } else if (!orignalPost.published && post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        });
      }
    } else if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'Updated',
          data: post
        }
      });
    }

    return post;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => {
      return user.id === args.comment.author;
    });

    const postExists = db.posts.some(post => {
      return post.id === args.comment.post && post.published;
    });

    if (userExists && postExists) {
      const comment = {
        id: uuidv4(),
        ...args.comment
      };

      db.comments.push(comment);
      pubsub.publish(`comment ${comment.post}`, {
        comment: {
          mutation: 'Created',
          data: comment
        }
      });
      return comment;
    }

    throw new Error('User or Post not exists');
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.find(comment => {
      return args.id === comment.id;
    });
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }
    const deletedComment = db.comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'Deleted',
        data: deletedComment[0]
      }
    });
    return deletedComment[0];
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) {
      throw new Error('Comment does not exists');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'Updated',
        data: comment
      }
    });

    return comment;
  }
};

export { Mutation as default };
