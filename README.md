# DataBreeze Prebuilt Web Application 

### Databreeze is a prebuilt web database application designed using React, Redux, React-Router and other npm modules.

### Try the demo application at https://app.databreeze.com

This prebuilt application provides a configurable approach to database sources. Once configured Databreeze provides HTML menus and views such as listing multiple records as well as viewing of individual records. The system offers list, search, pagination, detail, edit, deletion, and creating of new records.  

This application utilizes Redux connect actions to dispatch asyncronous fetch API calls that read, insert, update and delete data accessed via a backend [Databreeze API Server](https://github.com/DataBreeze/dbzApi). The API Server utilizes nodejs/express to manage file uploads and authentication as well as mongodb database access.

## Databreeze is built utilizing many different github projects:
- [CrocoDillan universal boilerplate](https://github.com/CrocoDillon/universal-react-redux-boilerplate/tree/v2).
- bootstrap
- React (isomorphic), React Router and Redux
- React-dropzone for file uploading
- react-image-gallery for displaying multiple images
- S3 Uploader for creating multiple sized images which are uploaded to S3
- and many other npm modules

## What is a prebuilt framework?

The idea is to provide a complete and functional framework to quickly build web applications. Databreeze is designed so you can customize your views of data and utilize the framework to fetch and load data and state. Use Databreeze to learn how to use React, Redux and React-Router or configure your own application using the framework.

## Download and install

`git clone https://github.com/databreeze/dbz`

`cd dbz`

`npm install`

### Setup the [Databreeze API Server](https://github.com/DataBreeze/dbzApi)

### Configure your mongoose data sources
