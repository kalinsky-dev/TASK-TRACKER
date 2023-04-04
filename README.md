# Task Tracker

This is an application like Kanban, where you and your team can store and manage your Tasks.
The system include all the Tasks which has to be resolved.

### Features

Every Task includes dynamic Information for its:

- Name
- Description
- Creator
- Information, if the Task is taken or still available 
- Information for the person, who has taken the Task, if it is in a progress
- Information for the state, if the Task is finished, person who resolved it and his working hours


Non-authenticated users are prompt to sign-in in the system. 
If there are no Tasks created, the user is ivited to craete its own.
Once authenticated a user can Create, Read, Update, Take/Finish, Delete and Sort the Tasks:

 1. Create:
 - By means of an Add button, the user can Create his own Task, submitting its Name and Description.
 2. Read:
 - All created Tasks are listed in the Board.
 3. Update:
 - By double click of the Task in the board, the user can update it (change its Name or Description), 
 but only if it is the Creator and the Task is not in a progress. The Task can also not be updated, if it is Finished.
 4. Take:
 - By double click of the Task in the board, the user can Take it, but only if it is still available(not in Progress)
 5. Finish:
 - The user who has taken the Task can Finish it, by dobule click on the Task in the board, submitting his working hours.
 If the Task is clicked by person, who has not taken it directly, a message is shown that the Task is in a Progress.
 6. Delete:
- only the creator of the Task can Delete it, but only if it is not in Pogress.
- if the Task is in Progress, it can not be deleted by anyone.
- When the Task is finished an X icon on the right top corner is shown and the user can Delete it from there.
- The Task can be deleted also by double click.
 7. Sort:
 - if Tasks are more than one, a Sort button is shown and everybody can Sort all Tasks in the system by their working hours in ascending order. Tasks, which are still not taken are arranged on the bottom of the board.


### Used technologies

- Front-end built with React
- Softuni-Pracite-Server for authentication and data storage
- JEST, React Testing Library for Component Unit Testing


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `node server.js`

Runs the server. 
Be careful to run the server from the server folder in a separate terminal.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
