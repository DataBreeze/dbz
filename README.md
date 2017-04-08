# DataBreeze

## Try the demo application t https://app.databreeze.com

## A prebuilt database application framework designed using React, Redux, React-Router.

This framework provides a configurable approach to database sources. Once configured Databreeze provides HTML menus and views such as listing multiple records as well as viewing of individual records. The system offers list, search, pagination, detail, edit, deletion, and creating of new records.  

This application utilizes Redux connect actions to dispatch asyncronous fetch API calls that read, insert, update and delete data housing in a mongodb database. The system utilizes a separate API database utilizing nodejs/express to manage file uploads as well as mongodb database access. 

## Databreeze is built utilizing many different github projects:
- CrocoDillan universal boilerplate. (https://github.com/CrocoDillon/universal-react-redux-boilerplate/tree/v2).
- bootstrap
- React (isomorphic), React Router and Redux
- React-dropzone for file uploading
- react-image-gallery for displaying multiple images
- S3 Uploader for creating multiple sized images which are uploaded to S3
- and many others...

## What is a prebuilt framework?

The idea is to provide a complete and functional framework to quickly build web applications. Databreeze is designed so you can customize your views of data and utilize the framework to fetch and load data and state.

## Getting started!

```bash
git clone https://github.com/databreeze/dbz
cd dbz
npm install
```
