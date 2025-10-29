// components/Footer.jsx
import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" py={4} textAlign="center" bg="gray.800" color="white" zIndex={1000}>
      <Text fontSize="sm">© {new Date().getFullYear()} My App. All rights reserved.</Text>
    </Box>
  );
}
