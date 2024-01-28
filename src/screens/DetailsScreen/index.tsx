import React from "react";
import Container from "../../components/Container";
import EmptyListAnimation from "../../components/EmptyListAnimation";
import HeaderBar from "../../components/HeaderBar";

const DetailsScreen = () => {
  return (
    <Container>
      <HeaderBar title="Details Screen" />
      <EmptyListAnimation title={"No Search Data"} />
    </Container>
  );
};

export default DetailsScreen;
