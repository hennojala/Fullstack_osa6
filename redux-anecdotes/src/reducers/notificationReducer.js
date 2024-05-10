import { createSlice } from '@reduxjs/toolkit';


const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notif(state, action) {return action.payload}
  },
});

export const setNotification = (notif, time) => {
  return dispatch => {
    dispatch({
      type: 'notification/notif',
      payload: { notif, time }
    });
    
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};


export const clearNotification = () => {
    return {
        type: 'notification/notif',
        payload: null,
    }
}

export const { notif } = notificationSlice.actions;
export default notificationSlice.reducer;