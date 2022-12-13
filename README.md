# Discovery Web Test Task

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions to run the application

Open a terminal/command-prompt In the application's directory,

1. Run `npm install` to install all required dependencies
2. Run `npm start` This will run application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## The libraries, which is used

1. `@mui/material`: Use to manage theme mode and create customizable components.
2. `@mui/icons-material`: To use material icons component.
3. `@tanstack/react-table`: To create a table component.
4. `@tanstack/react-query`: To fetch table data by infinite scoll
5. `axios-mock-adapter`: To create mock API
6. `axios`: To call API

## What is covered

1. Dark/Light Mode
2. Filter for each column
3. Global search throughout the table
4. Ascending & Descending Sort for each column
5. Infinite Scrolling mechanism
6. Header Column Spanning
7. Header Row Spanning
8. Cell Column Spanning
9. Cell Row Spanning
10. Column Pinning

## What is not covered

1. Sticky UI

   - When pin the column and scroll horizantally(if more columns available), all the columns(pinned as well) are scrolling.

2. Display column data in a different column when a specific column is not visible
   - This is not availabe by default as a feature in table library which you shared.
   - The approach to achive this:
     We can achive this by creating a local variable and store the column C values in it, initially.When scroll the column H and it not visible to users we replace column C's values with column H's values and when column H will be visible, undo the column C value from local variable.

## Code structure

1. the Main file of the project is `src/index.js`

## Extra things

1. Remove menu icon(three dot) button from table header, because there is no use of this button and also UI is not looking good.
