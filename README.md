# DataBreeze Web Database Application 

----
Databreeze is a GitHub Open Source web application designed using ReactJS. Databreeze requires minimal configuration and coding to allow navigation, searching, listing, viewing and editing of database information.  The application utilizes React, React-Router, Redux, ES6, ES7 and NPM modules including ESLint, Babel and Webpack. Databreeze is configured to work with a [Databreeze API](https://github.com/DataBreeze/dbzApi) server accessing MongoDB. 

----
## Demo app: [app.databreeze.com](https://app.databreeze.com)

The demo application server runs Centos7 on an AWS Instance using Nginx, Node.js and KOA.js. A separate Centos7 AWS instance runs the API Node Express.js cluster server that accesses a MongoDB database using Mongoose.

----
## Isomorphic/universal/server rendering

Databreeze is an isomorphic application employing common React components on the Server and Client. Server side rendering generates an initial page using the same React components that afterward operate client side.

----
## User Authentication

Databreeze handles secure user account creation and login using Json Web Tokens (JWT). Authentication is used to enforce an owner-edit policy for database data. The system also provides a token based password reset via email. 

----
## S3 Image Upload
Databreeze allows image upload from the client, processes them on the API server to generate multiple resized images, then uploads them to Amazon S3. The resized images are then served directly from S3 to clients.

----
## Minimal configuration and coding

Databreeze is a prebuilt application that provides a configurable approach to data sources. Once set, Databreeze provides HTML menus, various views for listing multiple records and viewing/editing of individual records. The system offers list, pagination, search, detail, update, deletion, and creation of new records.

----
## Redux for state management

This application utilizes Redux connect actions to dispatch asyncronous fetch API calls that read, insert, update and delete data accessed via a backend [Databreeze API Server](https://github.com/DataBreeze/dbzApi). The API Server utilizes nodejs/express to manage file uploads and authentication as well as mongodb database access.

----
## Selected Github/NPM projects:

- [CrocoDillan universal boilerplate](https://github.com/CrocoDillon/universal-react-redux-boilerplate/tree/v2).
- bootstrap
- React (isomorphic), React Router and Redux
- React-dropzone for file uploading
- react-image-gallery for displaying multiple images
- S3 Uploader for creating and uploading multiple sized images to S3
- and many other NPM modules

----
## Complete pre-built application

The idea is to provide a complete and functional framework to quickly build web applications. Databreeze is designed so you can customize your views of data and utilize the framework to fetch and load data and state. Use Databreeze to learn how to use React, Redux and React-Router or configure your own application using the application.


## Download and install

`git clone https://github.com/databreeze/dbz`

`cd dbz`

`npm install`


----
## Explore main documentation

- [src/](https://github.com/DataBreeze/dbz/tree/master/src)

- [src/README.md](https://github.com/DataBreeze/dbz/tree/master/src/README.md)

----
## Setup the API Server

[Databreeze API Server](https://github.com/DataBreeze/dbzApi)

----
## Author

Joe Junkin 
[joe.junkin.com](http://joe.junkin.com)
 