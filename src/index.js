import React, { Component, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';



// this function is basically curry form of => function logger(obj,next,action);
const logger = function ({ dispatch, getState }) { // logger(obj)(next)(action)
  return function (next) {
    return function (action) {
      // middleware code
      if (typeof action !== 'function') {
        console.log("Action_TYPE=", action.type);
      }
      next(action);
    }
  }
}

// we can also write the above as this => 

/*
const logger = ({ dispatch, getState }) => (next) => (action) => {
  // logger code
  if (typeof action !== 'function') {
        console.log("Action_TYPE=", action.type);
      }
  next(action);
}
*/

const thunk = ({ dispatch, getState }) => (next) => (action) => {
  // logger code
  if (typeof action === 'function') {
    action(dispatch);
    return;
  }
  next(action);
}

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store', store);
// console.log('Before store.getState() = ', store.getState());

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "Superman" }]
// });

// console.log('After store.getState() = ', store.getState());

export const StoreContext = createContext();
console.log("Store Context =", StoreContext);

class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}

//const connectedAppComponent = connect(callback)(App);
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => {
          this.forceUpdate();
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBePassedAsProps = callback(state);
        return (
          <Component  {...dataToBePassedAsProps} dispatch={store.dispatch} />
        );
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {store => <ConnectedComponent store={store} />}
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode >
);
