import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import shows from "./reducers/shows";

const store = createStore(shows, applyMiddleware(thunk));

export default store;
