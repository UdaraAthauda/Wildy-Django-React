import {
  Flex,
  Heading,
  Button,
  Card,
  Field,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

export default function WriteBlog() {
  const { id, name } = useParams();

  return (
    <>
      <Heading fontSize={{ base: "md", md: "2xl" }} textAlign={{base:'center', md:'start'}}>
        Write a Blog about {name}
      </Heading>

      <Flex justify={'center'} align={'center'} mt={5}>
        <Card.Root w={{base:'full', md:'80%'}} shadow={'xl'}>
          <Card.Header>
            <Card.Title color={'teal.500'}>Express your ideas</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
              <Field.Root>
                <Field.Label>First Name</Field.Label>
                <Input />
              </Field.Root>
              <Field.Root>
                <Field.Label>Last Name</Field.Label>
                <Input />
              </Field.Root>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline">Cancel</Button>
            <Button variant="solid">Sign in</Button>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </>
  );
}
