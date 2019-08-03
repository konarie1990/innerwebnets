import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// reuse setAlert anywhere!
// create a timeout variable and pass into setAlert

export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // set a timeout for the alert
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    timeout
  );
};
