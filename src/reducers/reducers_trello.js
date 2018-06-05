import _ from 'lodash';
import { GET_CARDS_TASKS_LISTS, GET_COMMENT, DELETE_COMMENT, DELETE_CARD, GET_USER_TABLES, GET_USER_GROUPS, SIGN_IN, GET_TABLES_LISTS, SIGN_OUT, CREATE_TABLE, DELETE_TABLE, SHOW_GROUP, DELETE_GROUP, REMOVE_USER, GET_LISTS_CARDS } from '../actions';
import * as actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_TABLES:
//    console.log(action.payload.promise)
//    let a= Promise.resolve(action.payload)
//    console.log(a)
// Promise.resolve(action.payload).then(function(value){console.log('Value:',value)})
// case actions.GET_USER_TABLES_PENDING:
//     console.log( {...state} )
//   return { ...state, isLoading: true };
// case actions.GET_USER_TABLES_FULFILLED:
//     console.log( {...state} )
//   return { ...state, isLoading: false, repositories: action.payload };
// case actions.GET_USER_TABLES_REJECTED:
//     console.log( {...state} )
//     return { ...state, isLoading: false, isError: true }
      console.log('action: reducer', action.payload.data.data)
    return _.mapKeys(action.payload.data.data, 'id');

    case GET_TABLES_LISTS:
      console.log('action: reducer', action.payload.data.data)
    return _.mapKeys(action.payload.data.data, 'id');
    //NIE DZIAŁA COMPONENT signOut, więc to jest niepotrzebne
    // case SIGN_OUT:
    // console.log('a')
    //   return state
    case DELETE_TABLE:
      return _.omit(state, action.payload);
    case GET_USER_GROUPS:
      return _.mapKeys(action.payload.data.data, 'id')
    case SHOW_GROUP:
    console.log('reducer SHOW_GROUP', action.payload.data.data.group.members)
      return _.mapKeys(action.payload.data.data, 'id');
    case DELETE_GROUP:
    console.log('delete group',action.payload)
      return _.omit(state, action.payload);//(to co było dotychczas, to co usuwam)
    case REMOVE_USER://nie działa chyba do końca 27.05
    console.log('remove', action)
      return _.omit(state, action.payload);

    case GET_LISTS_CARDS:
    console.log('reducer', action)
      return _.mapKeys(action.payload.data.data, 'id');

    case DELETE_CARD:
      return _.omit(state, action.payload);

    case GET_COMMENT:
      return _.mapKeys(action.payload.data.data, 'id');

    case DELETE_COMMENT:
      console.log('remove', action)
      return _.omit(state, action.payload);

    default:
      return state;
  }
}
