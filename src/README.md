# Databreeze documentation for the src directory

----
## src/actions
contains redux actions for user authentication and data sources.

----
## src/dbz - library files

----
## src/modules - Meat and potatoes of the application.

- src/modules/App/components/Auth/[](https://github.com/DataBreeze/dbz/tree/master/src/modules/App/components/Auth) for account creation, login, etc

- [src/modules/Source/components/](https://github.com/DataBreeze/dbz/tree/master/src/modules/Source/components) the data source files containing the majority of the system code.  

----
## initialState.js configuration

- [src.initialState.js.README](https://github.com/DataBreeze/dbz/blob/master/src/initialState.js.README.md)
- [src/initialState.js.example](https://github.com/DataBreeze/dbz/blob/master/src/initialState.js.example)

You must create your own initialState.js file and configure it correctly for the system to work. View the [initialState.js.README.md](https://github.com/DataBreeze/dbz/blob/master/src/initialState.js.README.md) for more detail
