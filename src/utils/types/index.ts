import { ImageProps } from "react-native";

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

type TYPE_MeatType = "All" | "Beef" | "Fish" | "Pork" | "Poultry";

type TYPE_MeatData = {
  id: string;
  name: string;
  description: string;
  imagelink: ImageProps;
  favourite: boolean;
  type: TYPE_MeatType;
  price: number;
  quantity: number;
};

export type {
  TYPE_User,
  TYPE_DatabaseResponse,
  TYPE_LoggedInUserInfo,
  LoginStackParamList,
  TYPE_MeatType,
  TYPE_MeatData,
};
