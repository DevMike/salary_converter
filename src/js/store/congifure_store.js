import rootReducer from "../reducers/index";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk
    )
  )
);

export default configureStore
