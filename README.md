# Github Profile Explorer

Simply a small react.js application that interacts with the 'Github' APIs, with a flavor of hipolabs.

## Outline

- Demo
- How to run locally
- Abstract
- Additions to the user interface
- Folder structure
- Architectural decisions
- External libraries usage
- Notes on caching

## Demo

Insert gif or link to demo

## How to run locally

Clone the Github repo then

```
npm install
npm start
```

## Abstract

This is README goes over the development lifecycle of this application, additions to original design, folder structure, and architectural decisions. When developing this application, pixel perfect implementation and full functionality were the focus; While considering a smooth experience for the user when navigating through the app.

## Additions to the user interface

A well developed frontend application is attentive to user experience. Though provided designs elegantly executed, it can benefit from a slight touch.

- `Search` CTA button was added to the main screen improving the user experience, So users don't get confused after filling the text field.

- `Back to search` navigation button to link the profile screen to the main screen, and improving user experience.

## Folder structure

```markdwon
.
├── api
│   └── index.js
├── components
│   ├── Button
│   ├── Hipo
│   ├── Input
│   ├── Message
│   ├── Profile
│   └── Skeleton
├── hooks
│   └── messageApi.js
├── index.css
├── index.js
├── reportWebVitals.js
├── routes
│   ├── repos.js
│   └── root.js
└── styles
    ├── Repos.module.css
    └── Root.module.css
```

`api`
: code that calls the github api.

`components`
: All the custom components and widgets used in the app

`hooks`
: contains `messageApi.js` which is a custom react hooks to implement popup message functionality

`index.css`
: css file reset and fonts imports

`index.js`
: application entry point and contains react-router-code

`routes`
: contains `repos.js` and `root.js` which are the only two screens in the application

`styles`
: contains css styling per screen

## Architectural decisions

This section provides an overview of a the architectural decisions made in the development process, edge use cases, custom components, API calls, routing, data store & caching, and animations. Some of the decisions made aim to make the code base decoupled and testable, therefore achieving a high sepration of concerns.

### Edge use cases

The following use cases, user behavior, and API responses are considered and accounted for.

- User submits an empty text field, if so an error massage appear.
- Input text field is validated using the github username regex `/^[a-z@\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i`.
- Input text field can accept a username with or without an `@` symbol. Example: both usernames are valid `@mohi2code`, `mohi2code`.
- If a 'GitHub' profile is not found; A 404 response is returned from the server, and a popup error message appears.
- All errors regarding the network are handled and an apropriate error message is displayed.

### Custom components

When implementing a pixel perfect design, custom styled components are essential. Yet there are many ways and designs to write them. Below is the code design for how a custom button component is implemented in this application.

```javascript
import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

const Button = forwardRef(
  ({ type = "default", children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={classNames(styles["button"], styles[`${type}`], className)}
      {...props}
    >
      {children}
    </button>
  )
);
```

Regarding the styling, plain old css and css modules are used to style this custom button component according the provided design.

### API calls

The code for sending requests to github servers is basically a custom hook. This hook is designed in a decoupled manner from UI components allowing for greater sepration of concerns and testability. Furthermore, load more functionality and pagination are implemented in the application

[This article](https://betterprogramming.pub/react-reusable-api-calls-with-custom-hooks-typescript-obviously-a62fda7df1b6) Provides a healthy explanation of the method used in this application to implement custom hooks for API calls.

To use the 'Github' APIs service, A token was generated that's going to last for 60 days. Though it's a security concern, and the token should be provided as an environment variable; The token for now is viewable in the code.

### Routing

For routing, [React Router v6](https://reactrouter.com/en/main) was used to link the two screens together.

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "profile/:username",
    element: <Repos />,
  },
]);
```

### Data store and caching

Since this application is relatively small; No state management framework such as redux or context api + useReducer, was used. For caching, a simple technique was used and it's further discussed below in the `Notes on caching` section.

### Animations

[Framer Motion](https://www.framer.com/motion/animation/) is used to facilitate all the animations and transitions in the application.

## External libraries usage

- `@octokit/rest` to facilitate the process of calling 'GitHub' APIs and manage tokens.

- `classnames` to manage css classes when building custom components.

- `framer-motion` to implement animations and transitions.

## Notes on caching

When implementing caching, two options were considered. The first option is to cache the data in `Local storage`. Another option is to use react context api or a const variable and store the data in RAM.

For this application, a const of type `Map` was used to cache the user data.

```javascript
const userCache = new Map();
```

In the api code, the following if statement is ran before fetching a user's data .

```javascript
if (userCache.get(username)) {
  setData(userCache.get(username).profile);
  console.log(
    `%c✨ Loading ${username} cached profile data from memory...`,
    "color:yellow; font-size: 12px;"
  );
  return userCache.get(username).profile;
}
```

if the user's data is not cached; The code request data from 'GitHub' APIs and cache it.

```javascript
setIsLoading(true);
const profile = await octokit.request("GET /users/{username}", {
  username: username,
});
setData(profile);
console.log(
  `%c🚀 Loading ${username} profile data from server... `,
  "color:yellow; font-size: 12px;"
);
setIsLoading(false);
userCache.set(username, { profile });
```
