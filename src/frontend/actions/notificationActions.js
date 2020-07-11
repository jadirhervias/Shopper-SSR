/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  setRegistrationDeviceId,
  setNotificationKeyAndKeyName,
  setError,
} from '.';

export const createUserDeviceGroup = (deviceId, userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await axios({
        url: '/create-device-group',
        method: 'POST',
        data: {
          user_id: userId,
          registration_ids: [deviceId],
        },
      });

      // Notification key and notification key name
      console.log(data);
      console.log(status);

      document.cookie = `notificationKeyName=${data.notification_key_name}`;
      document.cookie = `notificationKey=${data.notification_key}`;

      dispatch(
        setNotificationKeyAndKeyName({
          notificationKeyName: data.notification_key_name,
          notificationKey: data.notification_key,
        })
      );
    } catch (error) {
      console.log(`Error action - ${error}`);
      dispatch(setError(error));
    }
  };
};

// Add it to the Firebase server
export const addRegistrationDeviceId = (deviceId, userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await axios({
        url: `/add-device/${userId}`,
        method: 'POST',
        data: {
          registration_ids: [deviceId],
        },
      });

      console.log(data);
      console.log(status);

      // document.cookie = `notificationDeviceId=${deviceId}`;

      // dispatch(setRegistrationDeviceId(deviceId));
    } catch (error) {
      console.log(`Error action - ${error}`);
      dispatch(setError(error));
    }
  };
};

export const removeRegistrationDeviceId = (deviceId, userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await axios({
        url: `/remove-device/${userId}`,
        method: 'POST',
        data: {
          registration_ids: [deviceId],
        },
      });

      console.log(data);
      console.log(status);

      document.cookie = 'registrationDeviceId=';

      dispatch(setRegistrationDeviceId(null));
    } catch (error) {
      console.log(`Error action - ${error}`);
      dispatch(setError(error));
    }
  };
};

export const setUserNotificationKeyAndKeyName = (keys) => {
  return async (dispatch) => {
    try {
      dispatch(setNotificationKeyAndKeyName(keys));
    } catch (error) {
      console.log(`Error action - ${error}`);
      dispatch(setError(error));
    }
  };
};

// Set the state and cookie
export const setUserRegistrationDeviceId = (deviceId) => {
  return async (dispatch) => {
    try {
      document.cookie = `registrationDeviceId=${deviceId}`;
      dispatch(setRegistrationDeviceId(deviceId));
    } catch (error) {
      console.log(`Error action - ${error}`);
      dispatch(setError(error));
    }
  };
};
