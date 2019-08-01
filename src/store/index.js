import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web;

import * as reducers from "./ducks";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"]
};

const rootReducers = combineReducers({
  router: connectRouter(history),
  ...reducers
});
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(
  persistedReducer,
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
export { persistor };
export default store;
