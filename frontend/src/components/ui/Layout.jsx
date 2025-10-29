import { Box, Flex, Container } from "@chakra-ui/react";
import Navbar from "../navbars/Navbar";
import Footer from "../navbars/Footer";
import Sidebar from "../navbars/Sidebar";

export default function Layout({ children }) {
  return (
    <Flex direction="column" minH="100vh">
      {/* Navbar */}
      <Navbar />

      {/* Main Content with Sidebar + Content */}
      <Flex flex="1"> {/* add margin-top = Navbar height */}
        {/* Sidebar (desktop only) */}
        <Box as={'aside'} position={'fixed'} top={0} left={0} bottom={0} zIndex={900} boxShadow={'md'}>
          <Sidebar />
        </Box>

        {/* Page Content */}
        <Box as={'main'} flex="1" ml={{ base: 0, md: "190px" }} py={{ base: 5, md: 5 }} mt="60px">
          <Container>
            {children}
          </Container>
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}
