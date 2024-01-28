import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { COLORS, FONTFAMILY, FONTSIZE } from "../../utils/theme/theme";
import AuthContext from "../../authContext";
import styles from "./style";

const LoginInFooter = ({
  navigation,
  type,
  onClickHandler,
}: {
  navigation: any;
  type: "login" | "register";
  onClickHandler: () => void;
}) => {
  const { setExploreApp } = useContext(AuthContext);

  return (
    <View style={styles.FooterContainer}>
      <TouchableOpacity style={styles.FooterButton} onPress={onClickHandler}>
        <Text style={styles.FooterButtonText}>
          {type === "login" ? "Sign In" : "Sign up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          type === "login"
            ? navigation.navigate("RegisterScreen")
            : navigation.navigate("LoginScreen");
        }}
      >
        <Text style={styles.ScreenChangeText}>
          {`${type === "login" ? "Do not have" : "Have"}`} an account?{" "}
          <Text style={styles.ScreenChangeInnerText}>
            {type === "login" ? "Register" : "Login"}
          </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.Options}>
        <View style={styles.GreenLine} />
        <Text style={styles.OptionsText}>or</Text>
        <View style={styles.GreenLine} />
      </View>

      <TouchableOpacity
        style={styles.FooterButton}
        onPress={() => setExploreApp?.(true)}
      >
        <Text style={styles.FooterButtonText}>Explore our app</Text>
      </TouchableOpacity>

      {type === "register" && (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: FONTFAMILY.avenir,
              color: COLORS.primaryBlackRGBA,
            }}
          >
            By sigining up you agree to our,{" "}
            <Text style={styles.ScreenChangeInnerText}>Terms</Text>,{" "}
            <Text style={styles.ScreenChangeInnerText}>Data Policy</Text> and
          </Text>

          <TouchableOpacity>
            <Text
              style={[
                styles.ScreenChangeInnerText,
                { color: COLORS.primaryBlackRGBA, fontSize: 13, },
              ]}
            >
              Cookies Policy
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LoginInFooter;
