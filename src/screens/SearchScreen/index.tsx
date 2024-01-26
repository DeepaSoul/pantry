import { StatusBar } from "react-native";
import React from "react";
import { COLORS } from "../../utils/theme/theme";
import HeaderBar from "../../components/HeaderBar";
import EmptyListAnimation from "../../components/EmptyListAnimation";
import Container from "../../components/Container";

const SearchScreen = () => {
  return (
    <Container>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <HeaderBar title="Search Screen" />
      <EmptyListAnimation title={"No Search Data"} />
    </Container>
  );
};

export default SearchScreen;
