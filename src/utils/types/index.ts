type TYPE_User = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

type TYPE_DatabaseResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

type TYPE_LoggedInUserInfo = {
  email: string;
  password: string;
};

type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type {
  TYPE_User,
  TYPE_DatabaseResponse,
  TYPE_LoggedInUserInfo,
  LoginStackParamList,
};
