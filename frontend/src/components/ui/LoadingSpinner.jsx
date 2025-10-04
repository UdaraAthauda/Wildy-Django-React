import { Flex, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Flex align={'center'} justify={'center'} minH={'70vh'}>
      <Spinner
        color={"teal"}
        size={"xl"}
        animationDuration={"0.8s"}
        borderWidth={"3px"}
      />
    </Flex>
  );
};

export default LoadingSpinner;
