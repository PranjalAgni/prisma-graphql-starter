const users = [
  {
    id: '1',
    name: 'Pranjal',
    email: 'some@example.com'
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'some2@example.com'
  },
  {
    id: '3',
    name: 'Mike',
    email: 'some3@example.com'
  }
];

const posts = [
  {
    id: '10',
    title: 'Graphql + React',
    body: 'This is my first article',
    published: false,
    author: '1'
  },
  {
    id: '12',
    title: 'Webpack the speed you need',
    body: 'Nice Algorithms tested',
    published: true,
    author: '1'
  },
  {
    id: '23',
    title: 'Explore Regex',
    body: 'This is informatic',
    published: true,
    author: '2'
  }
];

const comments = [
  {
    id: '123',
    text: 'This is valuable',
    author: '1',
    post: '10'
  },
  {
    id: '234',
    text: 'Best article on this topic',
    author: '2',
    post: '10'
  },
  {
    id: '345',
    text: 'Thankyou for your efforts',
    author: '1',
    post: '12'
  },
  {
    id: '456',
    text: 'First comment on the article',
    author: '2',
    post: '23'
  }
];

const db = {
  users,
  posts,
  comments
};

export { db as default };
