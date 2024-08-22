import { authSuccess } from 'services/redux/AuthSlice';
import { store } from 'services/redux/store';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';
import { appLoader } from 'utils/functions';

import apiInstance from '..';
import {
  IAddTaskReq,
  IDeleteTaskReq,
  IDeveloperListReq,
  IListTaskReq,
  ISignInReq,
  ISignInRes,
  ISignUpReq,
  IUpdateDetailsTaskReq,
  IUpdateTaskReq
} from './types';

export const authAPI = {
  // SignIn
  async signIn(data: ISignInReq): Promise<IApiSuccess<ISignInRes>> {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.auth.signIn, data)
      .then((response) => {
        console.log('response: ', response);
        store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  },

  async signUp(data: ISignUpReq) {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.auth.signUp, data)
      .then((response) => {
        // store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  },

  async addTask(data: IAddTaskReq) {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.task.taskAdd, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('authTokenDemoAppDev') as never
          )}`
        }
      })
      .then((response) => {
        // store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  },

  async listTask(data: IListTaskReq) {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.task.taskList, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('authTokenDemoAppDev') as never
          )}`
        }
      })
      .then((response) => {
        // store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  },

  async updateTask(data: IUpdateTaskReq) {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.task.taskUpdate, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('authTokenDemoAppDev') as never
          )}`
        }
      })
      .then((response) => {
        // store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  },

  async updateTaskDetails(data: IUpdateDetailsTaskReq) {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.task.taskUpdateDetails, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('authTokenDemoAppDev') as never
          )}`
        }
      })
      .then((response) => {
        // store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  },

  async developerList(data: IDeveloperListReq) {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.developer.list, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('authTokenDemoAppDev') as never
          )}`
        }
      })
      .then((response) => {
        // store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  },

  async deleteTask(data: IDeleteTaskReq) {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.task.delete, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('authTokenDemoAppDev') as never
          )}`
        }
      })
      .then((response) => {
        // store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  }
};
