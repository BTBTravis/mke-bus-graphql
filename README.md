# MKE BUS GraphQL API

GraphQL API for MCTS Real Time Data


[![CircleCI](https://circleci.com/gh/BTBTravis/mke-bus-graphql.svg?style=svg)](https://circleci.com/gh/BTBTravis/mke-bus-graphql)



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

+ node >= v6.9
+ npm >= v3.5
+ MCTS Real-Time API key
  + [Create and account here](http://realtime.ridemcts.com/bustime/home.jsp)
  + Confirm Email
  + Sign in and navigate to My API 
  + Request API Acess
  + Should receive email with API key shortly


### Installing

To get MKE BUS GraphQL server running on your local machine do the following steps.

1. ```git clone https://github.com/BTBTravis/mke-bus-graphql.git```
2. ```cd mke-bus-graphql```
3. ```echo "API_KEY=xxxxxxxxxxxxxxxxxx" >> .env```
  + where xxx is your API key from MCTS.
  + ```echo "example text" >> example.txt``` creates a example.txt file in the current directory containing "example test"
4. ```npm install```
5. ```npm run start```

nodemon should now be active running the server on port 3000. You can access super helpful graphiql interface from **http://localhost:3000/graphiql** otherwise send GraphQL request to **http://localhost:3000/graphql** . Changes in the code will auto reload the server but sometimes you have to manually reload the `/graphiql` page when working with it. 

## Running the tests

Yay TDD! We are currently using dependency injection with along side libraries: mocha, chai, sinon, and supertest to facilitate testing. Also have CircleCI hooked up to make sure all test are passing before merging pull request.  

### Run test locally

Run tests once: ``` npm run test ```

*npm script so you don't have to have mocha installed globally 

Continuously run tests on file save: ```npm run test-watch``` 

*currently can't run tests while running the server because both use port 3000

### And coding style tests

We use [ESLint](https://eslint.org/) to avoid divergent coding styles. The process goes:

```npm run lint```  --> fix style errors --> repeat 

## Deployment

### Heroku deployment
1. Follow install instructions to get things up and running locally first.
1. Make sure you have heroku account and [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
1. Init heroku with ```heroku create```
1. Load your API key into heroku ```heroku config:set API_KEY=xxxxxxxxxxxxxxx``` where xxx is your key
1. Push code to heroku ```git push heroku master```
1. Create a single dyno ```heroku ps:scale web=1```
1. Open Project with ```heroku open``` should get a **Cannot GET /** because this server only exposes two end points.
1. Add `/graphiql` to the URL to navigate to GraphiQL to and make some queries or explore the documentation. 
1. Create an awesome app powered by GraphQL and MCTS Real-Time Data. 

## Built With
* [Express.js](https://expressjs.com/) - The Nodejs server  framework used
* [apollo-server](https://github.com/apollographql/apollo-server) - GraphQL server used
* [Babel](https://babeljs.io/) - The ES6 compiler used
* [NPM](https://www.npmjs.com/) - The dependency manager used

## Contributing

Please read [CONTRIBUTING.md](https://raw.githubusercontent.com/BTBTravis/mke-bus-graphql/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases page](https://github.com/BTBTravis/mke-bus-graphql/releases). 

## Authors

* **Travis Shears** - *Initial work* - [travisshears.com](https://travisshears.com/),
[GitHub](https://github.com/BTBTravis/)

See also the list of [contributors](https://github.com/BTBTravis/mke-bus-graphql/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://raw.githubusercontent.com/BTBTravis/mke-bus-graphql/master/LICENSE.md) file for details

## Acknowledgments

* All data is provided by [MCTS Real-Time](http://realtime.ridemcts.com/bustime/home.jsp)
