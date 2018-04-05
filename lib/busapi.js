export default (services) => () => {
  var api = services.axios.create({
    baseURL: 'http://realtime.ridemcts.com/bustime/api/v1/',
  });
  var XMLtoJSON = xml => {
    return new Promise(function(resolve, reject) {
      services.parseString(xml, function (err, res){
        if(err) reject(err);
        else resolve(res);
      });
    });
  };
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
    }
  }
}
