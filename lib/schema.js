export default (services) => () => {
  const typeDefs = `

  type ServerTimes {
    graphqlServer: Int!
    MCTSRealTime: Int!
  }

  type Route {
    rt: String!,
    rtnm: String,
    rtclr: String,
    rtdd: String
    dir: [String]
  }

  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
    serverTimes: ServerTimes
    routes: [Route]
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
    postId: Int!
    ): Post
  }
  `;
  // example data
  const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
  ];
  const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
  ];
  const serverTimes = {
    graphqlServer: Math.round((new Date()).getTime() / 1000),
    MCTSRealTime: services.busAPI.getTime()
  };
  const routes = services.busAPI.getRoutes();

  const resolvers = {
    Query: {
      posts: () => posts,
      author: (_, { id }) => {
        let a = authors.filter(b => b.id === id);
        return a.length === 1 ? a[0] : null;
      },
      serverTimes: () => serverTimes,
      routes: () => routes
    },

    Mutation: {
      upvotePost: (_, { postId }) => {
        const post = find(posts, { id: postId });
        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`);
        }
        post.votes += 1;
        return post;
      },
    },

    Route: {
      dir: rt => services.busAPI.getDirectionsByRoute(rt.rt)
    },

    Author: {
      posts: author => posts.filter(post => post.authorId === author.id ),
    },

    Post: {
      author: post => {
        let a = authors.filter(author => author.id === post.authorId)
        return a.length === 1 ? a[0] : null;
      }
    },
  };

  return services.makeExecutableSchema({
    typeDefs,
    resolvers,
  });
}
//{
  //author(id: 3) {
    //id
    //firstName
    //lastName
  //}
//}
