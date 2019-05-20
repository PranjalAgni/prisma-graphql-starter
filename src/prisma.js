import { Prisma } from 'prisma-binding';
//Database Id df4f7gn4kse4di

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.100:4466'
});

export { prisma as default };
// Create a new Post
// Fetch all the info about the user.
//Mutation createPost

// const createPostForUser = async (authorId, data) => {
//   const userExists = prisma.exists.User({
//     id: authorId
//   });

//   if (!userExists) {
//     throw new Error('User not found');
//   }

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     '{ author { id name email posts { id title published } }  }'
//   );

//   return post.author;
// };

// createPostForUser('cjvsi7zur00ar0789i6w1b4dk', {
//   title: 'Googgle',
//   body: 'hahahahhaha hahahahhah hahahhah....',
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(e => {
//     console.log(e);
//   });

// //Mutation updatePost
// const updatePostForUser = async (postId, data) => {
//   const postExists = prisma.exists.Post({
//     id: postId
//   });

//   if (!postExists) {
//     throw new Error('Post not exists');
//   }
//   const author = await prisma.mutation.updatePost(
//     {
//       data: {
//         ...data
//       },
//       where: {
//         id: postId
//       }
//     },
//     '{ author { id name email } }'
//   );

//   return author;
// };

// updatePostForUser('cjvsinm4o00cj0789obkczfe9', {
//   title: 'Back to learn Graphql',
//   body: 'Its Night!!!',
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(e => {
//     console.log(e);
//   });
