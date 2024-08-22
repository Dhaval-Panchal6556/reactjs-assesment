import toast from 'react-hot-toast';

// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;

// Local Storage Variables
export const LocalStorageKeys = {
  user: `user${APP_NAME}`,
  authToken: `authToken${APP_NAME}`
};

// Api Endpoint
export const ApiEndPoints = {
  auth: {
    signIn: `developer/login`,
    signUp: `developer/register`
  },
  user: {
    userList: `admin/user/list`
  },
  task: {
    taskAdd: 'task/add',
    taskList: 'task/list',
    taskUpdate: 'task/update',
    taskUpdateDetails: 'task/updateTaskDetails',
    delete: 'task/delete'
  },
  developer: {
    list: 'developer/list'
  }
};

export const appToaster = (type: string, message: string = '') => {
  if (type === 'success') {
    toast.success(typeof message === 'string' ? message : 'Success');
  } else {
    toast.error(typeof message === 'string' ? message : 'Something went wrong');
  }
};
