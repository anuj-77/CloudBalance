// import { createStore, combineReducers } from 'redux';
// import userReducer from './reducer';

// const rootReducer = combineReducers({
//   user: userReducer,
// });

// const store = createStore(rootReducer);
// export default store;

import { combineReducers, createStore } from 'redux';
import userReducer from './reducer';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", 
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

export { store, persistor };
