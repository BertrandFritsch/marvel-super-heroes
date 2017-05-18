# Demo of a React / redux / redux-saga Application

A sample application to illustrate the implementation of a JavaScript single-page application (SPA).

## Application Architecture

- [React](https://facebook.github.io/react/) / [redux](http://redux.js.org/) application
- [redux-saga](https://github.com/redux-saga/redux-saga) as the side effect manager.
- [Sass](http://sass-lang.com/)
- [Babel](https://babeljs.io/) to transpile the ES6 code
- [Jest](https://facebook.github.io/jest/) / [Enzyme](http://airbnb.io/enzyme/) for unit tests and code coverage
- [Webpack 2](https://webpack.js.org/)

It's an MVC application:

- Model: redux
- View: React
- Controller: redux-saga

A specific effort has been made to decouple the responsibilities of the different parts of the application.
The view handles only the UI rendering and the dispatching of the end user-initiated events. 
The events are then dispatched through the redux pipeline to go either straight to the
redux store, or are caught by a saga.
The saga reacts on events to issue asynchronous calls to the server. Upon the reception of the 
response, the saga dispatches a new event to the redux bus to let the store update its
data. An event is then forwarded to the UI layer to update its views.

#### The view
The view applies [the separation of the containers and the components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
The components are isolated from the other parts of the application to make them pure as often as possible, therefore easily testable.
The containers is a middleware between the view and the redux store. Their responsibility is to transform the data
in a form expected by the components.

The React execution model is heavily based on the update of the view whenever anything is changed in the store, or
whenever an event is dispatched by redux. Therefore, to keep the performances acceptable for the end user, tools
like [memoizers](https://github.com/reactjs/reselect) and [immutable objects](https://facebook.github.io/immutable-js/) are used to make the detection of the changes, thus the regeneration of the view, cheap.

Pure components are easily testable.
Furthermore, [Facebook Jest](https://facebook.github.io/jest/) coupled to the [Enzyme framework](https://github.com/airbnb/enzyme) makes the view components
easily testable. The ability to create snapshots of the components speeds up the development of the tests of the UI.
 
#### The model
There is not a lot to say about the model. It is as dumb as possible. Its responsibility is just to listen 
to redux events to update the stored data.
The pure aspect of the reducer functions makes them easily testable too.

#### The controller
redux-saga is used to manage the side-effects of the application. Despite the inherent complexity of asynchronous
calls, its declarative nature is a great way to deal with them. Again, as the sagas are pure functions too, 
testing them is quite simple.

### Bounded contexts
The application highlights also an approach to modularize a huge base of code by using bounded contexts, an idea taken
 from domain-driven design.

A bounded context is a subset of code that maps to a business unit. The bounded context communicates with other contexts
through events. This is a difference with other usages of React/redux implementations. Here, we don't use redux actions.
All the items that are dispatched through the redux bus are past events. This is the reason why all the event names 
use the past tense.

Having only events in the application means that there is no controller. The components are decentralized. They
listen to each other to take action on surfacing events.

## Installation
Use a recent version of node.js

Go to the cloned directory.

Install the node dependencies:

```bash
npm install
```

Start the server in debug mode:

```bash
npm run build:watch
```

The server is listening at http://localhost:8080/

To run the unit tests:

```bash
npm run test:unit
```

To check the flow types:

```bash
npm run flow
```

To analyze the code with eslint:

```bash
npm run lint
```
