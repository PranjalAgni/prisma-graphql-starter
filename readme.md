If you are trying to understand the codebase this might help.

# Graphql Prisma Bindings

Prisma Binding provides a high level API to interact with database.

Talking about prisma.js file

- # Query Operations

Just use `prisma.query` to query anything.

Example
We can pass query in the parameters.

Parameters => (Operation_args, selection_set)

```js
// Promise Version
prisma.query.users(null, '{ id name posts {id title body} }').then(data => {
  console.log(JSON.stringify(data, undefined, 2));
});
```

---

```js
//async-await version.
const users = async () => {
  const usersList = await prisma.query.users(
    null,
    '{ id name posts {id title body} }'
  );
  return usersList;
};

usersList
  .then(users => {
    console.log(JSON.stringify(data, undefined, 2));
  })
  .catch(e => {
    console.log(e);
  });
```

- # Mutation Operations

Just use `prisma.mutation` to perform mutation operations.

```js
// Promise Version
prisma.mutation
  .updatePost({
    data: {
      title: 'This is updated',
      body: 'Its updated!!! from dsef..',
      published: true
    },
    where: {
      id: 'cjures4qi00380789t104pvi2'
    }
  })
  .then(data => {
    console.log(JSON.stringify(undefined, data, 2));
  });
```

---

```js
// Async-await version.
const updatePostForUser = async (postId, data) => {
  const postExists = prisma.exists.Post({
    id: postId
  });

  if (!postExists) {
    throw new Error('Post not exists');
  }
  const author = await prisma.mutation.updatePost(
    {
      data: {
        ...data
      },
      where: {
        id: postId
      }
    },
    '{ author { id name email } }'
  );

  return author;
};
```

- # Exists
  To check if some data exists it returns true or false.
  Example:

```js
const postExists = prisma.exists.Post({
  id: postId
});
```

---

```js
const userExists = prisma.exists.User({
  id: 'abc123'
});
```
