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

To get MKE BUS GraphQL server running on your local machine do the following.

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

*currently can't be run tests while running the server because both use port 3000

### And coding style tests

Linting coming soon!

## Deployment

Heroku deployment integration coming soon!

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
