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

  type Stop {
    stpid: Int!,
    lat: Float,
    lon: Float,
    stpnm: String
  }

  type Vehicle {
    vid: Int!
    tmstmp: Int
    lat: Float
    lon: Float
    hdg: Int
    pid: Int
    rt: String
    des: String
    pdist: Int
    spd: Int
    tablockid: String
    tatripid: Int
    zone: String
  }

  type ServiceBulletin {
    nm: String
    sbj: String
    dtl: String
    brf: String
    prty: String
    srvc: String
  }

  # the schema allows the following query:
  type Query {
    serverTimes: ServerTimes
    routes: [Route]
    vehicles(vid: Int!): [Vehicle]
    stops(rt: String!, dir: String!): [Stop]
    stop(stpid: Int!): Stop
    serviceBulletins(rt: String!): [ServiceBulletin]
  }`;
  // data sources
  const serverTimes = {
    graphqlServer: Math.round((new Date()).getTime() / 1000),
    MCTSRealTime: services.busAPI.getTime()
  };
  const routes = services.busAPI.getRoutes();
  const vehicle = (vid) => services.busAPI.getVehiclesByVID(vid);
  const stops = (rt, dir) => services.busAPI.getStopsByRoute(rt, dir);
  const stop = (stpid) => services.busAPI.getStopByStpid(stpid);
  const sbs = (rt) => services.busAPI.getServiceBulletinsByRoute(rt);

  const resolvers = {
    Query: {
      serverTimes: () => serverTimes,
      routes: () => routes,
      vehicles: (_, { vid }) => vehicle(vid),
      stops: (_, { rt, dir}) => stops(rt, dir),
      stop: (_, {stpid}) => stop(stpid),
      serviceBulletins: (_, { rt }) => sbs(rt)
    },

    Route: {
      dir: rt => services.busAPI.getDirectionsByRoute(rt.rt)
    },
  };

  return services.makeExecutableSchema({
    typeDefs,
    resolvers,
  });
}

