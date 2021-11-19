
import { combineReducers } from "redux";

export interface ReducerType {

}

const reducers = combineReducers<ReducerType>({

});

const createRootReducer = (state: any, action: any) => {
  return reducers(state, action);
};

export default createRootReducer;
