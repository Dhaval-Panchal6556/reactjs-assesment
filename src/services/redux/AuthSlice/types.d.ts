export interface IUserData {
  authToken: string;
}

export interface ILoginApiParam {
  email: string;
  password: string;
  deviceId: string;
  deviceType: string;
  fcmToken: string;
}
