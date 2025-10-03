import { Box, Container } from "@chakra-ui/react";
import Navbar from "../navbars/Navbar";
import Footer from "../navbars/Footer";

export default function Layout({ children }) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Container maxW="6xl" flex="1" py={8}>
        {children}
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
