import _ from 'lodash';
import { GET_CARDS_TASKS_LISTS, DELETE_TASK_LIST } from '../actions';
import * as actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CARDS_TASKS_LISTS:
    console.log(action)
      return _.mapKeys(action.payload.data.data, 'id');
    case DELETE_TASK_LIST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
