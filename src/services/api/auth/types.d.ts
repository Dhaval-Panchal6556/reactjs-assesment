export interface ISignInReq {
  email: string;
  password: string;
}

export interface ISignUpReq {
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
}

export interface IAddTaskReq {
  title: string;
  status: string[];
  assignedTo: string;
  developerId: string;
}

export interface IListTaskReq {
  page: number;
  limit: number;
}

export interface IUpdateTaskReq {
  _id: string;
  status: string;
}

export interface IUpdateDetailsTaskReq {
  _id: string;
  title: string;
  status: string;
  assignedTo: string;
}

export interface IDeveloperListReq {
  page: number;
  limit: number;
}

export interface ISignInRes {
  _id: string;
  authToken: string;
}

export interface IDeleteTaskReq {
  _id: string;
  authToken: string;
}
