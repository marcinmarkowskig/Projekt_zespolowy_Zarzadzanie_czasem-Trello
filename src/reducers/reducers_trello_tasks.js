import _ from 'lodash';
import { GET_TASKS_LISTS_TASKS, DELETE_TASK } from '../actions';
import * as actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_TASKS_LISTS_TASKS:
      return _.mapKeys(action.payload.data.data, 'id');
    case DELETE_TASK:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
