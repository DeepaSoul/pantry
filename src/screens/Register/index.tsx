import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Container from "../../components/Container";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../utils/theme/theme";
import Title from "../../components/Title";
import { TYPE_User } from "../../utils/types";
import LoginInFooter from "../../components/LoginInFooter";
import Left from "../../assets/icons/left.svg";
import AuthContext from "../../authContext";
import EyeOpen from "../../assets/icons/eyeOpened.svg";
import EyeClosed from "../../assets/icons/eyeClosed.svg";
import Cross from "../../assets/icons/cross.svg";
import { registerUser } from "../../store/database";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

type InputType =
  | "name"
  | "password"
  | "none"
  | "emailAddress"
  | "telephoneNumber";

const RegisterScreen = ({ navigation }: any) => {
  const { setExploreApp, setUser } = useContext(AuthContext);

  const [userLoginFormData, setUserLoginFormData] = useState<TYPE_User>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<
    { name: keyof TYPE_User; message: string }[]
  >([]);
  const [submitError, setSubmitError] = useState<string>();

  const onRegisterIn = async () => {
    if (formErrors.length > 0) {
      return;
    }
    if (
      userLoginFormData.email == "" ||
      !userLoginFormData.email ||
      userLoginFormData.password == "" ||
      !userLoginFormData.password ||
      userLoginFormData.fullName == "" ||
      !userLoginFormData.fullName ||
      userLoginFormData.phoneNumber == "" ||
      !userLoginFormData.phoneNumber
    ) {
      return setSubmitError("Information Missing");
    }
    const signedIn = await registerUser(userLoginFormData);

    if (signedIn?.success) {
      setSubmitError(undefined), setUser?.(userLoginFormData);
    } else {
      setSubmitError(signedIn.error || "User not registered.");
    }
  };

  const changeTextInput = (
    name: keyof TYPE_User,
    text: string,
    type: InputType
  ) => {
    submitError && setSubmitError(undefined);

    if (
      (type === "telephoneNumber" && !new RegExp("[^0-9]", "g").test(text)) ||
      type !== "telephoneNumber"
    ) {
      setUserLoginFormData({ ...userLoginFormData, [name]: text });
    }

    if (type === "telephoneNumber" && (text.length < 9 || !parseInt(text))) {
      setFormErrors([
        ...formErrors,
        { name, message: "Telephone Number incorrect." },
      ]);
    } else if (
      type == "emailAddress" &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)
    ) {
      setFormErrors([...formErrors, { name, message: "Email incorrect." }]);
    } else if (text.length < 4) {
      setFormErrors([...formErrors, { name, message: "Too short." }]);
    } else if (formErrors.find((err) => err.name == name)) {
      setFormErrors([...formErrors.filter((err) => err.name != name)]);
    }
  };

  const renderInput = ({
    placeholder,
    label,
    name,
    type = "none",
  }: {
    placeholder: string;
    label: string;
    name: keyof TYPE_User;
    type?: InputType;
  }) => {
    const [showPass, setShowPass] = useState(false);
    const error = formErrors.find((err) => err.name == name)?.message;

    return (
      <View style={{ gap: SPACING.space_8, marginVertical: SPACING.space_15 }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.avenir,
            color: COLORS.primaryBlackRGBA,
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: SPACING.space_4,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.primaryBlackRGBA,
          }}
        >
          {type === "telephoneNumber" && (
            <TextInput
              maxLength={9}
              textContentType={type}
              placeholder={"+27"}
              value={"+27"}
              style={{
                fontFamily: FONTFAMILY.adobe_garamond_bold,
                color: COLORS.primaryBlackRGBA,
                width: SCREEN_WIDTH * 0.1,
                paddingRight: SPACING.space_4,
                marginRight: SPACING.space_8,
                borderRightWidth: 1,
                borderRightColor: COLORS.primaryBlackRGBA,
                fontSize: FONTSIZE.size_18,
              }}
            />
          )}
          <TextInput
            textContentType={type}
            placeholder={placeholder}
            value={userLoginFormData[name]}
            secureTextEntry={type === "password" && !showPass}
            onChangeText={(text) => {
              changeTextInput(name, text, type);
            }}
            style={{
              fontFamily: FONTFAMILY.adobe_garamond,
              fontSize: FONTSIZE.size_18,
              color: COLORS.primaryBlackRGBA,
              width:
                type === "telephoneNumber"
                  ? SCREEN_WIDTH * 0.73
                  : SCREEN_WIDTH * 0.85,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              type === "password"
                ? setShowPass(!showPass)
                : setUserLoginFormData({
                    ...userLoginFormData,
                    [name]: undefined,
                  });
            }}
          >
            {type === "password" ? (
              showPass ? (
                <EyeOpen color={COLORS.primaryBlackRGBA} />
              ) : (
                <EyeClosed color={COLORS.primaryBlackRGBA} />
              )
            ) : (
              <Cross color={COLORS.primaryBlackRGBA} />
            )}
          </TouchableOpacity>
        </View>
        {error && (
          <Text style={{ fontFamily: FONTFAMILY.avenir, color: "red" }}>
            {error}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Container>
      <ScrollView>
        <View style={{ padding: SPACING.space_15 }}>
          <View style={{ marginLeft: -SCREEN_WIDTH * 0.01 }}>
            <Left color={COLORS.primaryBlackRGBA} />
          </View>

          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            onPress={() => {
              setExploreApp?.(true);
            }}
          >
            <Text style={{ fontFamily: FONTFAMILY.avenir }}>Explore app</Text>
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: FONTFAMILY.adobe_garamond,
              fontSize: SPACING.space_20 * 2,
              color: COLORS.primaryBlackRGBA,
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.adobe_garamond,
              fontSize: SPACING.space_20 * 2,
              color: COLORS.primaryBlackRGBA,
              marginBottom: SPACING.space_10,
            }}
          >
            Pantry by Marble
          </Text>

          <Text
            style={{
              fontFamily: FONTFAMILY.avenir,
              fontSize: SPACING.space_16,
              color: COLORS.primaryBlackRGBA,
            }}
          >
            Sign up for easy payment, collection
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.avenir,
              fontSize: SPACING.space_16,
              color: COLORS.primaryBlackRGBA,
            }}
          >
            and much more
          </Text>

          <Title title="" />

          <View style={{ marginTop: SCREEN_HEIGHT * 0.08 }} />

          {renderInput({
            placeholder: "John Doe",
            name: "fullName",
            label: "Full Name",
            type: "name",
          })}

          {renderInput({
            placeholder: "john.doe@email.com",
            name: "email",
            label: "Email",
            type: "emailAddress",
          })}

          {renderInput({
            placeholder: "72 815 4332",
            name: "phoneNumber",
            label: "Mobile Number",
            type: "telephoneNumber",
          })}

          {renderInput({
            placeholder: "********************",
            name: "password",
            label: "Create Password",
            type: "password",
          })}

          {submitError && (
            <Text style={{ fontFamily: FONTFAMILY.avenir, color: "red" }}>
              {submitError}
            </Text>
          )}

          <LoginInFooter
            navigation={navigation}
            onClickHandler={onRegisterIn}
            type="register"
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default RegisterScreen;
