export default (services) => () => {
  const typeDefs = `

  type ServerTimes {
    graphqlServer: Int!
    MCTSRealTime: Int!
  }

  type Route {
    rt: String!
    rtnm: String
    rtclr: String
    rtdd: String
    dir: [String]
  }

  type Stop {
    stpid: Int!
    lat: Float
    lon: Float
    stpnm: String
    predictions: [Prediction]
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

  type Prediction {
    tmstmp: Int
    typ: String
    stpnm: String
    stpid: Int
    vid: Int
    dstp: String
    rt: String
    rtdd: String
    rtdir: String
    des: String
    prdtm: Int
    tablockid: String
    tatripid: String
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
    predictions(stpid: Int!): [Prediction]
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
  const predictions = (stpid) => services.busAPI.getPredictionsByStpid(stpid);

  const resolvers = {
    Query: {
      serverTimes: () => serverTimes,
      routes: () => routes,
      vehicles: (_, { vid }) => vehicle(vid),
      stops: (_, { rt, dir}) => stops(rt, dir),
      stop: (_, {stpid}) => stop(stpid),
      serviceBulletins: (_, { rt }) => sbs(rt),
      predictions: (_, { stpid }) => predictions(stpid)
    },

    Route: {
      dir: rt => services.busAPI.getDirectionsByRoute(rt.rt)
    },

    Stop: {
      predictions: stop => services.busAPI.getPredictionsByStpid(stop.stpid)
    }
  };

  return services.makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};

