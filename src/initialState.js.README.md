# Create and Edit the initialState.js file

----
## You must create and edit the initialState.js file

`cp src/initialState.js.example src/initialState.js`

----
## Edit the initialState.js file

Within this file you will find a json object that will be utilized by the Databreeze system to initialize and display many settings.

This file will also be used by redux to store state.

----
## Sections of the file.

- user: system use for user/auth

- app.cfg.logoClass: font-awesome icon to be used to left of logoTitle

- app.cfg.homeUrl: the URL for the application home

- app.cfg.homeLabel: Name that appears to right of logo

- app.cfg.fetch.apiHost: URL of host used by fetchjs for API calls. Change this to your API host.

- app.cfg.fetch.apiSourcePath: The path for data source calls, no need to change this unless you modify the API Server routes.

- app.cfg.fetch.apiUserPath: The path used for User Auth. No need to change this unless you modify the API server routes.

- app.cfg.s3.host: The full host URL to your S3 bucket e.g. 'https://s3-us-west-1.amazonaws.com/[yourbucketname]/[yourPath]/'

- defaultSource: $yourDefaultSource used by the [router](https://github.com/DataBreeze/dbz/blob/master/src/routes.jsx) as the default data source if none is specified e.g. localhost redirects to localhost/$yourDefaultSource

- **source: Of prime importance** Your data source configuration. You should retain `user` and `photo` as these are used by the system.

- Add your own source, e.g.

- source.sources.$yourSourceName.source: $yourSourceName

- source.sources.$yourSourceName.source.cfg: includes title, titlePlural, detail (descriptive title), iconClass (font-awesome icon), menu.show (include in system menu), menu.order (menu order), view.new (false won't show link for new record creation) 
