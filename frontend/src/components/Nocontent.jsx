import {
  Button,
  ButtonGroup,
  EmptyState,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { LuSearchX } from "react-icons/lu";

const Nocontent = ({ onBack }) => {
  const handleBackToHome = () => {
    onBack();
  };

  return (
    <Flex align={"center"} justify={"center"} minH={"60vh"}>
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuSearchX />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>No Content Available</EmptyState.Title>
            <EmptyState.Description>
              The searched information is not available. Please try again!
            </EmptyState.Description>
          </VStack>
          <ButtonGroup>
            <Button onClick={handleBackToHome} colorPalette={'green'}>Go Back</Button>
          </ButtonGroup>
        </EmptyState.Content>
      </EmptyState.Root>
    </Flex>
  );
};

export default Nocontent;
