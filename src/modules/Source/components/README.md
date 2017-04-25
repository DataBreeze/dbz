# Setting up Data Sources

The Source/components directory contains all of the Data Source React Components. When you are ready to add your own data source you will want to understand which files you want to modify to get started.

----
## Four Modes for each source.

- **Multi** Mode - displays multiple records in a list, table or index view. MultiInit.jsx, MultiSwitch.jsx and others.

- **Detail** Mode - Displays a single record in a read only view. DetailInit.jsx, DetailSwitch.jsx and others.

- **Edit** Mode - Displays a single record in an Edit form for editing. EditInit.jsx, EditSwitch.jsx, and others.

- **New** Mode - Displays a blank form for creating a new record. NewInit.jsx, NewSwitch.jsxand  others.

----
## Init component (e.g. MultiInit.jsx)
The **Init** Component will fetch data, process parameters and define props that will be handed down to child components. The Init components render function will call the **Switch** component 

----
## Switch Component (e.g. MultiSwitch.jsx)
The Switch Component will call the appropriate child component **based on the source name. The Switch Component should be used to load your custom child component**. 

----
## Understanding which components are loaded
Inspect the [src/routes.js](https://github.com/DataBreeze/dbz/blob/master/src/routes.jsx) file and determine which component is initially loaded. Then inspect that component and follow the child components.

Databreeze follows these steps for various views of data.

## Example: Multi Record component
This component is selected by default

- [MultiInit.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/MultiInit.jsx) The first step to displaying Multiple records. Fetches records, processes parameters and defines redux/system parameters to pass down to child components.

- [MultiSwitch.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/MultiSwitch.jsx). Determines by source name which multi child component to call. Will call Index.jsx, List.jsx or MultiGallery.jsx depending on the source name and props.

- [Index.jsx]
(https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/Index.jsx). The default component for multiple records.

- [IndexLeft.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/IndexLeft.jsx) Determines the left side display of Index view.

- [IndexRight.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/IndexRight.jsx) Determines the right side display of Index view.

- [IndexRec.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/IndexRec.jsx) Display of each individual record for the Index view.

----
## Author

Joe Junkin 
[joe.junkin.com](http://joe.junkin.com)
