export default (services) => () => {
  //util
  var XMLtoJSON = xml => {
    return new Promise(function(resolve, reject) {
      services.parseString(xml, function (err, res){
        if(err) reject(err);
        else resolve(res);
      });
    });
  };

  var stripXMLOBJ = obj => {
    let newObj = {};
    for(var key in obj) {
      if(Array.isArray(obj[key]) && obj[key].length === 1) newObj[key] = obj[key][0];
      else newObj[key] = obj[key];
    }
    return newObj;
  };

  var api = services.axios.create({
    baseURL: 'http://realtime.ridemcts.com/bustime/api/v1/',
  });
  return {
    getTime: () => {
      return api.get(`/gettime?key=${process.env.API_KEY}`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let time = data['bustime-response'].tm[0];
          return services.moment(time, 'YYYYMMDD HH:mm:ss').unix();
        });
    },
    getRoutes: () => {
      return api.get(`/getroutes?key=${process.env.API_KEY}`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let routes = data['bustime-response'].route;
          return routes.map(x => stripXMLOBJ(x));
        });
    },
    getVehiclesByRoute: (rt) => {
      if(Array.isArray(rt)){
        rt = rt.reduce((str, num) => {
          str += num + ',';
          return str;
        },'');
        rt = rt.substring(0, rt.length - 1);
      }
      return api.get(`/getvehicles?key=${process.env.API_KEY}&rt=${rt}&tmres=s`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let vehicles = data['bustime-response'].vehicle;
          vehicles =  vehicles.map(x => stripXMLOBJ(x));
          vehicles =  vehicles.map(x => { // convert time to unix
            x.tmstmp = services.moment(x.tmstmp, 'YYYYMMDD HH:mm:ss').unix();
            return x;
          });
          return vehicles;
        });
    },
    getVehiclesByVID: (vid) => {
      if(Array.isArray(vid)){
        vid = vid.reduce((str, num) => {
          str += num + ',';
          return str;
        },'');
        vid = vid.substring(0, vid.length - 1);
      }
      return api.get(`/getvehicles?key=${process.env.API_KEY}&vid=${vid}&tmres=s`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let vehicles = data['bustime-response'].vehicle;
          if(! vehicles) vehicles = [];
          vehicles =  vehicles.map(x => stripXMLOBJ(x));
          vehicles =  vehicles.map(x => { // convert time to unix
            x.tmstmp = services.moment(x.tmstmp, 'YYYYMMDD HH:mm:ss').unix();
            return x;
          });
          return vehicles;
        });
    },
    getDirectionsByRoute: (rt) => {
      return api.get(`/getdirections?key=${process.env.API_KEY}&rt=${rt}`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let dirs = data['bustime-response'].dir;
          return dirs;
        });
    },
    getStopsByRoute: (rt, dir) => {
      return api.get(`/getstops?key=${process.env.API_KEY}&rt=${rt}&dir=${dir}`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let stops = data['bustime-response'].stop;
          stops = stops.map(x => stripXMLOBJ(x));
          return stops;
        });
    },
    getStopByStpid: (id) => {
      return api.get(`/getstops?key=${process.env.API_KEY}&stpid=${id}`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let stops = data['bustime-response'].stop;
          if(!stops) throw 'no stop with that id';
          stops = stops.map(x => stripXMLOBJ(x));
          return stops[0];
        });
    },
    getServiceBulletinsByRoute: (rt) => {
      return api.get(`/getservicebulletins?key=${process.env.API_KEY}&rt=${rt}`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let sb = data['bustime-response'].sb;
          if(!sb) throw 'no sb on that rt';
          sb = sb.map(x => stripXMLOBJ(x));
          //return stops[0];
          return sb;
        });
    }
  };
};
