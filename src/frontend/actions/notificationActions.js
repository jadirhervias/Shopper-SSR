/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  setNotificationDeviceId,
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

export const addDeviceRegistrationId = (deviceId, userId) => {
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

      dispatch(setNotificationDeviceId(deviceId));
    } catch (error) {
      console.log(`Error action - ${error}`);
      dispatch(setError(error));
    }
  };
};

export const removeDeviceRegistrationId = (deviceId, userId) => {
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

      dispatch(setNotificationDeviceId(null));
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

export const setDeviceRegistrationId = (deviceId) => {
  return async (dispatch) => {
    try {
      dispatch(setNotificationDeviceId(deviceId));
    } catch (error) {
      console.log(`Error action - ${error}`);
      dispatch(setError(error));
    }
  };
};
