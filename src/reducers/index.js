import { combineReducers } from 'redux';
import TrelloReducers from './reducers_trello';
import TrelloReducersTasksLists from './reducers_trello_tasks_lists';
import TrelloReducersTasks from './reducers_trello_tasks';
import { reducer as formReducer } from 'redux-form';
// import {
//   createStore,
//   applyMiddleware,
//   compose
// } from 'redux';
// import thunk from 'redux-thunk';
// import duedates from './reducers/duedates'
//
// export default compose(applyMiddleware(thunk))(createStore)(duedates);
const rootReducer = combineReducers({
  tables: TrelloReducers,
  tasksLists: TrelloReducersTasksLists,
  tasks: TrelloReducersTasks,
  form: formReducer
});

export default rootReducer;
