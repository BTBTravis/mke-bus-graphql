
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
          return services.moment(time, "YYYYMMDD HH:mm:ss").unix();
        })
    },
    getRoutes: () => {
      return api.get(`/getroutes?key=${process.env.API_KEY}`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let routes = data['bustime-response'].route;
          return routes.map(x => stripXMLOBJ(x));
        })
    },
    getVehiclesByRoute: (rt) => {
      if(Array.isArray(rt)){
        rt = rt.reduce((str, num) => {
          str += num + ",";
          return str;
        },"");
        rt = rt.substring(0, rt.length - 1);
      }
      return api.get(`/getvehicles?key=${process.env.API_KEY}&rt=${rt}`)
        .then(function (res) {
          return XMLtoJSON(res.data);
        })
        .then(data => {
          let vehicles = data['bustime-response'].vehicle;
          return vehicles.map(x => stripXMLOBJ(x));
        })

    }
  }
}
