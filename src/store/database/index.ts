import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TYPE_DatabaseResponse,
  TYPE_LoggedInUserInfo,
  TYPE_User,
} from "../../utils/types";
import { CONST_LoggedInUserKey } from "../../constants";

const getLoggedInUser = async (): Promise<
  TYPE_DatabaseResponse<TYPE_User | undefined>
> => {
  try {
    const user = await AsyncStorage.getItem(CONST_LoggedInUserKey);

    if (user) {
      return {
        success: true,
        data: JSON.parse(user),
      };
    } else {
      return {
        success: false,
        error: "UR1: No user found",
        data: undefined,
      };
    }
  } catch (e) {
    // Ideally, best to log out the error to an error handler like bugsnag
    console.error("UR2: Error getting user", e);
    return {
      success: false,
      error: e as string,
      data: undefined,
    };
  }
};

const registerUser = async (
  userInformation: TYPE_User
): Promise<TYPE_DatabaseResponse<Boolean>> => {
  try {
    const user = await AsyncStorage.getItem(userInformation.email);
    if (user) {
      throw new Error("RGU01: User already exists");
    }
    await AsyncStorage.setItem(
      userInformation.email,
      JSON.stringify(userInformation)
    );
    await AsyncStorage.setItem(
      CONST_LoggedInUserKey,
      JSON.stringify(userInformation)
    );
    return {
      success: true,
      data: true,
    };
  } catch (e) {
    // Ideally, best to log out the error to an error handler like bugsnag
    console.error("RGU02: Error getting user", e);
    return {
      success: false,
      error: e as string,
      data: false,
    };
  }
};

const loginUser = async (
  userInformation: TYPE_LoggedInUserInfo
): Promise<TYPE_DatabaseResponse<TYPE_User | undefined>> => {
  try {
    const user = await AsyncStorage.getItem(userInformation.email);

    if (
      user &&
      (JSON.parse(user) as TYPE_User).password === userInformation.password
    ) {
      await AsyncStorage.setItem(
        CONST_LoggedInUserKey,
        JSON.stringify(userInformation)
      );
      return {
        success: true,
        data: JSON.parse(user),
      };
    } else {
      return {
        success: false,
        data: undefined,
      };
    }
  } catch (e) {
    // Ideally, best to log out the error to an error handler like bugsnag
    console.error("STU01: Failed to login user", e);
    return {
      success: false,
      error: e as string,
      data: undefined,
    };
  }
};

const logoutUser = async (): Promise<TYPE_DatabaseResponse<boolean>> => {
  try {
    await AsyncStorage.removeItem(CONST_LoggedInUserKey);
    return {
      success: true,
      data: true,
    };
  } catch (e) {
    // Ideally, best to log out the error to an error handler like bugsnag
    console.error("LOU01: Failed to logout user", e);
    return {
      success: false,
      error: e as string,
      data: false,
    };
  }
};

export { getLoggedInUser, registerUser, loginUser, logoutUser };
