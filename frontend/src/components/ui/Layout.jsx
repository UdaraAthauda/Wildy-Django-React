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
        <Sidebar />

        {/* Page Content */}
        <Box flex="1" px={{ base: 5, md: 8 }} py={{ base: 5, md: 8 }} mt="60px">
          <Container maxW={{ base: "100%", md: "6xl" }}>
            {children}
          </Container>
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}
