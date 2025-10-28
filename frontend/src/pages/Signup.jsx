import GoogleLoginButton from "@/components/GoogleLoginButton";
import React, { useContext, useEffect } from "react";
import { Box, Card, Flex, Image } from "@chakra-ui/react";
import { AuthContext } from "@/components/AuthContext";
import { Navigate } from "react-router-dom";
import bgimage from "../assets/bgimg.png"

export default function Signup() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <Flex justify="center" align="center" minH="75vh">
      <Card.Root
        flexDirection={{ base: "column", md: "row" }}
        overflow="hidden"
        shadow={"lg"}
      >
        <Image
          objectFit="cover"
          maxH={"300px"}
          w={{base:'none', md:'400px'}}
          src={bgimage}
          alt="Caffe Latte"
        />
        <Box flex={1}>
          <Card.Body gap={3}>
            <Card.Title mb="2" color={"teal.500"}>
              Sign Up
            </Card.Title>
            <Card.Description>
              Use Your Google Account to be a Contributer of Wildy
            </Card.Description>
            <Box mt={{ base: 0, md: 10 }}>
              <GoogleLoginButton />
            </Box>
          </Card.Body>
        </Box>
      </Card.Root>
    </Flex>
  );
}
