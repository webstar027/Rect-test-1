# Photo Gallery

This is an example application built with React and Typescript for searching images using 
[Unsplash Image API](https://unsplash.com/developers). A live preview is provided 
[here](https://quirky-gates-4e00d9.netlify.app/).

Preview: 

## Local development

Besides installing the dependencies (`npm install`), the application requires a key for
using Unsplash API. This access key is configured in the project using an environment variable
with the name `REACT_APP_UNSPLASH_ACCESS_KEY`. The easiest way of configuring the environment variable is by creating a `.env.local` file with the following content:

```
REACT_APP_UNSPLASH_ACCESS_KEY=MOQXII4HKGgR8OzYPERjN6Lk1zSWJiaFvGm1BZo7avg
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

