//stworzenie użytkownika
import axios from 'axios';

export const CREATE_USER = 'create_user';
export const CREATE_GROUP = 'create_group';
export const GET_USER_GROUPS = 'get_user_groups';
export const GET_TABLES_LISTS = 'get_tables_lists';
export const CREATE_LIST = 'create_list';
export const SIGN_OUT = 'sign_out';
export const DELETE_TABLE = 'delete_table';
export const DELETE_GROUP = 'delete_group';
export const DELETE_LIST = 'delete_list';
export const SHOW_GROUP = 'show_group';
export const CHANGE_LEADER = 'change_leader';
export const ADD_USER_TO_GROUP = 'add_user_to_group';
export const REMOVE_USER = 'remove_user';
export const GET_LISTS_CARDS = 'get_lists_cards';
export const CREATE_CARD = 'create_card';
export const DELETE_CARD = 'delete_card';
export const GET_COMMENT = 'get_comment';
export const CREATE_COMMENT = 'create_comment';
export const DELETE_COMMENT = 'delete_comment';
export const DELETE_TASK_LIST = 'delete_task_list';
export const GET_CARDS_TASKS_LISTS = 'get_cards_tasks_lists';
export const CREATE_TASK_LIST = 'create_task_list';
export const GET_TASKS_LISTS_TASKS = 'get_tasks_lists_tasks';
export const DELETE_TASK = 'delete_task';
export const CREATE_TASK = 'create_task';
export const GET_GROUP_TABLES = 'get_group_tables';

export const GET_USER_TABLES = 'get_user_tables';
export const SIGN_IN = 'sign_in';
export const CREATE_TABLE = 'create_table';

//----------------------------------

export function createUser(values, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let values2 = {
    "user": values
  }

  let request = axios.post('http://kanban-project-management-api.herokuapp.com/v1/users', values2, axiosConfig)

  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

  return {
    type: CREATE_USER,
    payload: request
  };
}

//----------------------------------------

export function signIn(values, callback, dane) {

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let request2 = axios.post('http://kanban-project-management-api.herokuapp.com/v1/sessions', values, axiosConfig)
  .then(request2 => {
    console.log('signIn ac:', request2.data.data.user)//działa dobrze
  //  getUserTables(request2.data.data.user.email, request2.data.data.user.authentication_token),
    setCookie('cookieEmail', request2.data.data.user.email),
    setCookie('cookieToken', request2.data.data.user.authentication_token),
    callback() })
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

  return {
    type: SIGN_IN,
    payload: request2
  };
}

//------------------------------------

//WSZYSTKO ZAKOMENTOWANE PONIŻEJ ODNOSI SIĘ DO getUserTables
// export function getUserTables(email, authentication_token) {
//   console.log('getUserTables ac:', email)//działa dobrze
//   console.log('getUserTables ac:', authentication_token)//działa dobrze
//   let axiosConfig = {
//     headers: {
//       'X-User-Email': email,
//       'X-User-Token': authentication_token
//     }
//   };
//
//   let request = axios.get('http://kanban-project-management-api.herokuapp.com/v1/tables',axiosConfig)
//
//   .then(request => {
//
//     return {
//       type: GET_USER_TABLES,
//       payload: request
//     };
//   })
//   .catch((error) => {
//     console.log('Error, trzeba poprawiac :/ ' + error);
//   });
// }
//------------------------------------

   // export function getUserTables(email, authentication_token) {
   //   return function action(dispatch) {
   //     dispatch({ type: FETCH_OFFERS })
   //
   //     console.log('getUserTables ac:', email)//działa dobrze
   //      console.log('getUserTables ac:', authentication_token)//działa dobrze
   //      let request = axios.get('http://kanban-project-management-api.herokuapp.com/v1/tables',axiosConfig)
   //      let axiosConfig = {
   //        headers: {
   //          'X-User-Email': email,
   //          'X-User-Token': authentication_token
   //        }
   //      };
   //
   //     return request.then(
   //       response => dispatch(getDataDone(request)),
   //      // err => dispatch(fetchOffersError(err))
   //     );
   //   }
   // }





   //-----




  // return dispatch => {
  //   let request = axios.get('http://kanban-project-management-api.herokuapp.com/v1/tables',axiosConfig)
  //
  //     .then(request => {
  //       // set state for success
  //       dispatch(getDataDone(request));
  //     })
  //     .catch(error => {
  //       // set state for error
  //       dispatch(getDataFailed(error));
  //     })
  // }



//------------


// export function fun(response) {
//   return{
//   type: GET_USER_TABLES,
//   payload: response
// };
// }


// export const GET_USER_TABLES_PENDING = 'GET_USER_TABLES_PENDING';
// export const GET_USER_TABLES_FULFILLED = 'GET_USER_TABLES_FULFILLED';
// export const GET_USER_TABLES_REJECTED = 'GET_USER_TABLES_REJECTED';

//--------------------------------------------------
//DZIAŁA DOBRZE
export function getUserTables(email, authentication_token) {

       let axiosConfig = {
         headers: {
           'X-User-Email': email,
           'X-User-Token': authentication_token
         }
       };

  let request = axios.get('http://kanban-project-management-api.herokuapp.com/v1/tables', axiosConfig)

  return {
    type: GET_USER_TABLES,
    payload: request
  }
}
//---------------------------------------------------
// export function getGroupTables(email, authentication_token) {
//sfasfasfasf
//        let axiosConfig = {
//          headers: {
//            'X-User-Email': email,
//            'X-User-Token': authentication_token
//          }
//        };
//
//   let request = axios.get('http://kanban-project-management-api.herokuapp.com/v1/tables', axiosConfig)
//
//   return {
//     type: GET_GROUP_TABLES,
//     payload: request
//   }
// }
//------------------------------------

export function getTablesLists(table_id, cookieEmail, cookieToken) {
console.log('getTablesLists ac:')
  let axiosConfig = {
    headers: {
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

 let request = axios.get(`http://kanban-project-management-api.herokuapp.com/v1/tables/${table_id}/lists`, axiosConfig)

 return {
   type: GET_TABLES_LISTS,
   payload: request
 }
}

//------------------------------------

export function createList(values, callback, table_id, cookieEmail, cookieToken) {

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request2 = axios.post(`http://kanban-project-management-api.herokuapp.com/v1/tables/${table_id}/lists`, values, axiosConfig)
  .then(request2 => {
  //  console.log('createList ac:', request2.data.data.user)//działa dobrze
  //  getUserTables(request2.data.data.user.email, request2.data.data.user.authentication_token),
    callback() })
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

  return {
    type: CREATE_LIST,
    payload: request2
  };
}

//------------------------------------
//NIE DZIAŁA PRAWIDŁOWO 19_05
// export function signOut( cookieEmail, cookieToken, callback ) {
//
//   let axiosConfig = {
//     headers: {
//       'Content-Type': 'application/json',
//       'X-User-Email': cookieEmail,
//       'X-User-Token': cookieToken
//     }
//   };
//
//   let request3 = axios.delete('http://kanban-project-management-api.herokuapp.com/v1/sessions', axiosConfig)
//   .then(request3 => {
//     console.log('signOut ac:', request3),//działa dobrze
//   //  getUserTables(request2.data.data.user.email, request2.data.data.user.authentication_token),
//    callback() })
//   .catch((error) => {
//     console.log('Error, trzeba poprawiac :/ ' + error);
//   });
//
//   return {
//     type: SIGN_OUT,
//     payload: request3
//   };
// }

//------------------------------------
//DZIAŁA
export function createTable(values, cookieEmail, cookieToken, callback) {
  let a = values.name
  let b = values.group_id
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let data = {
    name: a,
    group_id: b
  //  is_private: true, // było to i i tak działa dobrze
  }
  console.log('data',data)
  //console.log(data)
  let request2 = axios.post('http://kanban-project-management-api.herokuapp.com/v1/tables', data, axiosConfig)
  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);});
    console.log(request2)
  return {
    type: CREATE_TABLE,
    payload: request2
  };
}

//------------------------------------
//DZIAŁA
export function deleteTable(table_id, cookieEmail, cookieToken, callback) {
  console.log('jestem tu delete ac')
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/tables/${table_id}`, axiosConfig)
  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });
console.log(request3)
  return {
    type: DELETE_TABLE,
    payload: request3
  };
}

//------------------------------------
//DZIAŁA
export function getUserGroups(cookieEmail, cookieToken) {
  let axiosConfig = {
    headers: {
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request = axios.get('http://kanban-project-management-api.herokuapp.com/v1/groups',axiosConfig)

  return {
    type: GET_USER_GROUPS,
    payload: request
  };
}

//------------------------------------
//DZIAŁA
export function createGroup(values, cookieEmail, cookieToken, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let data = {
    "name": values.group_name
  }
  //console.log('DATA',data)
  //console.log('create group', data)
  let request = axios.post('http://kanban-project-management-api.herokuapp.com/v1/groups', data, axiosConfig)

  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

  return {
    type: CREATE_GROUP,
    payload: request
  };
}

//--------------------------------------

export function showGroup(group_id, cookieEmail, cookieToken) {

  let axiosConfig = {
    headers: {
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

 let request = axios.get(`http://kanban-project-management-api.herokuapp.com/v1/groups/${group_id}`, axiosConfig)
 .then(console.log('request SHOW GROUP', request))
 return {
   type: SHOW_GROUP,
   payload: request
 }
}

//-------------------------------------
//DZIAŁA
export function deleteGroup(group_id, cookieEmail, cookieToken, callback) {
  console.log('jestem tu delete group ac')
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/groups/${group_id}`, axiosConfig)
  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });
console.log(request3)
  return {
    type: DELETE_GROUP,
    payload: request3
  };
}

//------------------------------------

//DZIAŁA, ale można zmieni, bo nie działa odświeżanie i wypróbowac poza tym na wprowadzanych innych id
export function changeLeader(values, callback, group_id, cookieEmail, cookieToken) {
  console.log('changeLeader ac', group_id)
  console.log('values ac', values)
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request2 = axios.post(`http://kanban-project-management-api.herokuapp.com/v1/groups/${group_id}/change_leader`, values, axiosConfig)
  .then(request2 => {
    console.log('changeLeader ac:', request2),//działa dobrze
  //  getUserTables(request2.data.data.user.email, request2.data.data.user.authentication_token),
    callback() })
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

  return {
    type: CHANGE_LEADER,
    payload: request2
  };
}

//------------------------------------
//DZIAŁA
export function addUser(values, callback, group_id, cookieEmail, cookieToken) {
  console.log('addUserToGroup ac', group_id)
  console.log('values ac', values)
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request2 = axios.post(`http://kanban-project-management-api.herokuapp.com/v1/groups/${group_id}/add_user_to_group`, values, axiosConfig)
  .then(request2 => {
    console.log('addUserToGroup ac:', request2),//działa dobrze
  //  getUserTables(request2.data.data.user.email, request2.data.data.user.authentication_token),
    callback() })
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

  return {
    type: ADD_USER_TO_GROUP,
    payload: request2
  };
}

//--------------------------------------

// export function removeUser(values, callback, group_id, cookieEmail, cookieToken) {
//
//   console.log('removeUser ac', group_id)
//   console.log('values ac', values.user_id)
//   console.log('cookieEmail', cookieEmail)
//   console.log('cookieToken', cookieToken)
//   let axiosConfig = {
//     headers: {
//       'Content-Type': 'application/json',
//       'X-User-Email': cookieEmail,
//       'X-User-Token': cookieToken
//     }
//   };
//
//   let values2 = {
//     "user_id": 1
//   }
//   console.log('values2', values2)
// console.log('axiosConfig', axiosConfig)
//   let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/groups/${group_id}/remove_user_from_group`, values, axiosConfig)
// //console.log(`http://kanban-project-management-api.herokuapp.com/v1/groups/${group_id}/remove_user_from_group`)
//   .then(request3 => {
//     console.log('removeUser ac:', request3),//działa dobrze
//   //  getUserTables(request2.data.data.user.email, request2.data.data.user.authentication_token),
//     callback() })
//   .catch((error) => {
//     console.log('Error, trzeba poprawiac :/ ' + error);
//   });
//
//   return {
//     type: REMOVE_USER,
//     payload: request3
//   };
// }
//DO POPRAWIENIA
export function removeUser(values, group_id, cookieEmail, cookieToken) {
  console.log('remove user ac', group_id)
  //let number = Number(values.user_id)
  console.log('values ac', values)
  // let values2 = {
  //   "user_id": number
  // }
  // console.log(values2)
  console.log('values ac', cookieEmail)
  console.log('values ac', cookieToken)
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };
console.log(`http://kanban-project-management-api.herokuapp.com/v1/groups/${group_id}/remove_user_from_group`)
  let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/groups/${group_id}/remove_user_from_group`, values, axiosConfig)
  .then(request3 => {
    console.log('remove user ac:', request3)})
  //  getUserTables(request2.data.data.user.email, request2.data.data.user.authentication_token),
  //  callback() })
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

  return {
    type: REMOVE_USER,
    payload: request3
  };
}
//--------------------------------------
// function asyncStart(){
//    return { type:'ASYNC_REQUEST' };
// }
// function asyncError(e){
//  return {type:'ASYNC_ERROR', payload:{error:e}};
// }
// function asyncSuccess(res){
//   return {type:'ASYNC_SUCCESS',payload:{result:res}};
// }
// function asyncMethod(){
//  return (dispatch)=>{
//      dispatch(asyncStart());// or use  {type:'Something',payload:....};
//       anAsyncSomething.then((val)=>{
//           dispatch(asyncSuccess(val));
//        })
//       .catch((e)=>{
//           dispatch(asyncError(e));
//      });
//   }
//
// }



//----------------------------------
//DZIAŁA DOBRZE
export function getListsCards(cookieEmail, cookieToken, id_table, id_list) {
// console.log('getListsCards ac:')
console.log('id_table AC:', id_table)
console.log('id_list AC:', id_list)
// console.log('id_list ac:', cookieEmail)
// console.log('id_list ac:', cookieToken)
let number = String(id_list)

  let axiosConfig = {
    headers: {
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

 let request = axios.get(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards`, axiosConfig)

   return {
     type: GET_LISTS_CARDS,
     payload: request
   }
// return (dispatch) => {
//   request.then(({data}) => {
//     dispatch({type: GET_LISTS_CARDS, payload: data})
//   });
// }
}

//------------------------------------
//DZIAŁA
export function createCard(values, cookieEmail, cookieToken, callback, tableId, listId) {
// console.log('values createCard ac:', values)
// console.log('tableId createCard ac:', tableId)
// console.log('listId createCard ac:', listId)
  let axiosConfig = {
     headers: {
        'Content-Type': 'application/json',
        'X-User-Email': cookieEmail,
        'X-User-Token': cookieToken
    }
 };

 //console.log('axiosConfig createCard ac:', axiosConfig)
  let request2 = axios.post(`http://kanban-project-management-api.herokuapp.com/v1/tables/${tableId}/lists/${listId}/cards`,values, axiosConfig)
.then(() => callback())
  return {
    type: CREATE_CARD,
    payload: request2
  }
}

//--------------------------------------
//DZIAŁA DOBRZE
export function deleteCard(id_table, id_list, id_card, cookieEmail, cookieToken, callback) {
  console.log('jestem tu delete card ac')
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}`, axiosConfig)
  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });
console.log(request3)
  return {
    type: DELETE_CARD,
    payload: request3
  };
}

//-------------------------------------
//DZIAŁA DOBRZE
export function deleteList(id_list, id_table, cookieEmail, cookieToken, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}`, axiosConfig)
  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

console.log(request3)
  return {
    type: DELETE_LIST,
    payload: request3
  };
}

//------------------------------------------
//DZIAŁA DOBRZE
export function getCardsComments(cookieEmail, cookieToken, id_table, id_list, id_card) {

  let axiosConfig = {
    headers: {
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

 let request = axios.get(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/comments`, axiosConfig)

   return {
     type: GET_COMMENT,
     payload: request
   };
}

//-----------------------------------------

//DZIAŁA DOBRZE
export function createComment(values, callback, cookieEmail, cookieToken, id_table, id_list, id_card) {
// console.log('values createCard ac:', values)
// console.log('tableId createCard ac:', tableId)
// console.log('listId createCard ac:', listId)
  let axiosConfig = {
     headers: {
        'Content-Type': 'application/json',
        'X-User-Email': cookieEmail,
        'X-User-Token': cookieToken
    }
 };

 //console.log('axiosConfig createCard ac:', axiosConfig)
  let request2 = axios.post(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/comments`,values, axiosConfig)
.then(() => callback())
  return {
    type: CREATE_COMMENT,
    payload: request2
  }
}


//--------------------------------------------
//DZIAŁA DOBRZE
export function deleteComment( cookieEmail, cookieToken, id_table, id_list, id_card, id_comment, callback) {
  console.log('jestem tu delete comment ac')

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/comments/${id_comment}`, axiosConfig)
  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });
console.log(request3)
  return {
    type: DELETE_COMMENT,
    payload: request3
  };
}

//-------------------------------------------
//DZIAŁA DOBRZE
export function getCardsTasksLists(cookieEmail, cookieToken, id_table, id_list, id_card) {

  let axiosConfig = {
    headers: {
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

 let request = axios.get(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/tasks_lists`, axiosConfig)
//.then(request => console.log('vvv',request)) // w ten sposób  pisac
   return {
     type: GET_CARDS_TASKS_LISTS,
     payload: request
   };
}

//--------------------------------------------
//DZIAŁA DOBRZE
export function deleteTaskList(cookieEmail, cookieToken, id_table, id_list, id_card, id_taskList, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/tasks_lists/${id_taskList}`, axiosConfig)
  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

console.log(request3)
  return {
    type: DELETE_TASK_LIST,
    payload: request3
  };
}

//--------------------------------------------
//DZIAŁA DOBRZE
export function createTaskList(values, callback, cookieEmail, cookieToken, id_table, id_list, id_card) {
  let axiosConfig = {
     headers: {
        'Content-Type': 'application/json',
        'X-User-Email': cookieEmail,
        'X-User-Token': cookieToken
    }
 };
console.log(values)
  let request2 = axios.post(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/tasks_lists`, values, axiosConfig)
.then(() => callback())

  return {
    type: CREATE_TASK_LIST,
    payload: request2
  }
}

//--------------------------------------------
//DZIAŁA DOBRZE
export function getTasksListsTasks(cookieEmail, cookieToken, id_table, id_list, id_card, id_taskList) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

 let request = axios.get(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/tasks_lists/${id_taskList}/tasks`, axiosConfig)
//.then(request => console.log('vvv',request)) // w ten sposób  pisac
   return {
     type: GET_TASKS_LISTS_TASKS,
     payload: request
   };
}

//--------------------------------------------
//DZIAŁA DOBRZE
export function deleteTask(cookieEmail, cookieToken, id_table, id_list, id_card, id_taskList, id_task, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': cookieEmail,
      'X-User-Token': cookieToken
    }
  };

  let request3 = axios.delete(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/tasks_lists/${id_taskList}/tasks/${id_task}`, axiosConfig)
  .then(() => callback())
  .catch((error) => {
    console.log('Error, trzeba poprawiac :/ ' + error);
  });

console.log(request3)
  return {
    type: DELETE_TASK,
    payload: request3
  };
}
//-------------------------------------------

export function createTask(values, callback, cookieEmail, cookieToken, id_table, id_list, id_card, id_taskList) {
// console.log('values createCard ac:', values)
// console.log('tableId createCard ac:', tableId)
// console.log('listId createCard ac:', listId)
console.log('tu')
  let axiosConfig = {
     headers: {
        'Content-Type': 'application/json',
        'X-User-Email': cookieEmail,
        'X-User-Token': cookieToken
    }
 };

 //console.log('axiosConfig createCard ac:', axiosConfig)
  let request2 = axios.post(`http://kanban-project-management-api.herokuapp.com/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/tasks_lists/${id_taskList}/tasks`, values, axiosConfig)
.then(() => callback())
  return {
    type: CREATE_TASK,
    payload: request2
  }
}

//--------------------------------------------
function setCookie(name, val, days, path, domain, secure) {
    if (navigator.cookieEnabled) { //czy ciasteczka są włączone
        const cookieName = encodeURIComponent(name);
        const cookieVal = encodeURIComponent(val);
        let cookieText = cookieName + "=" + cookieVal;

        if (typeof days === "number") {
            const data = new Date();
            data.setTime(data.getTime() + (days * 24*60*60*1000));
            cookieText += "; expires=" + data.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    }
}


function showCookie(name) {
    if (document.cookie != "") {
        const cookies = document.cookie.split(/; */);

        for (let i=0; i<cookies.length; i++) {
            const cookieName = cookies[i].split("=")[0];
            const cookieVal = cookies[i].split("=")[1];
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }
    }
}
