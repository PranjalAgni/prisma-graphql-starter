const Query = {
  post() {
    return {
      id: 'hello69',
      title: 'React and Graphql',
      body: 'Hey lets get started',
      published: true,
      author: 1
    };
  },
  users(parent, args, { db, prisma }, info) {
    if (args.query) {
      return db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }
    return db.users;
  },
  posts(parent, args, { db }, info) {
    if (args.query) {
      return db.posts.filter(post => {
        return post.title.toLowerCase().includes(args.query.toLowerCase());
      });
    }
    return db.posts;
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export { Query as default };
