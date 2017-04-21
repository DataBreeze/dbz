# Setting up Data Sources

The src/modules/Source/components/ directory contains most of the Data Source files. When you are ready to add your own source you will want to understand which files you want to modify to get started.

Databreeze follows these steps for various views of data.

## Multi Record view - selected by default

- [MultiInit.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/MultiInit.jsx) component. The first step to displaying Multiple records. Fetches records and defines redux parameters to pass down to child components.

- [MultiSwitch.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/MultiSwitch.jsx). Determines by source name which multi component to call.

- [MultiSwitch.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/MultiSwitch.jsx). Determines by source name which multi component to call.

- [Index.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/Index.jsx). The default view for multiple records.

- [IndexLeft.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/IndexLeft.jsx) Determines the left side display of Index view.

- [IndexRight.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/IndexRight.jsx) Determines the right side display of Index view.

- [IndexRec.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/IndexRec.jsx) Display of the individual record for the Index view.


## Detail View - Display of an individual record.

- [DetailInit.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/DetailInit.jsx)


## Edit View - Edit Form to allow editing of an individual record.

- [DetailInit.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/EditInit.jsx)


## New View - New Record Form to allow creation of a new record.

- [NewInit.jsx](https://github.com/DataBreeze/dbz/blob/master/src/modules/Source/components/NewInit.jsx)