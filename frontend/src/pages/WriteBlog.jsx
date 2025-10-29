import api from "@/api";
import ImageUploader from "@/components/ImageUploader";
import { toaster } from "@/components/ui/toaster";
import {
  Flex,
  Heading,
  Button,
  Card,
  Field,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function WriteBlog() {
  const { id, name } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    snake: null,
    content: "",
    featured_image: null,
    status: "draft",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (file) => {
    setFormData({ ...formData, featured_image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const status = e.nativeEvent.submitter.value;

    const updatedFormData = {
      ...formData,
      snake: id,
      status,
    };

    try {
      await api.post("blogs/blog/", updatedFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (status === "published") {
        toaster.create({
          title: "Published",
          description: "Blog is successfully published",
          type: "success",
        });
      } else {
        toaster.create({
          title: "Draft",
          description: "Draft Blog successfully saved",
          type: "success",
        });
      }

      setFormData({
        title: "",
        snake: null,
        content: "",
        featured_image: null,
        status: "draft",
      });
      
    } catch (error) {
      console.error(error);

      toaster.create({
        title: "Failed",
        description: "Blog posting is unsuccessful",
        type: "error",
      });
    }
  };

  return (
    <>
      <Heading
        fontSize={{ base: "md", md: "2xl" }}
        textAlign={{ base: "center", md: "start" }}
      >
        Write a Blog about {name}
      </Heading>

      <Flex justify={"center"} align={"center"} mt={5}>
        <Card.Root
          as={"form"}
          onSubmit={handleSubmit}
          w={{ base: "full", md: "80%" }}
          shadow={"xl"}
        >
          <Card.Header>
            <Card.Title color={"teal.500"}>Express your ideas</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="5" w="full">
              <Field.Root required>
                <Field.Label>
                  Title
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Content
                  <Field.RequiredIndicator />
                </Field.Label>
                <Textarea
                  h={"200px"}
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Featured Image(Optional)</Field.Label>
                <ImageUploader onFileSelect={handleImageChange} />
              </Field.Root>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button
              variant="outline"
              name="status"
              value={"draft"}
              type="submit"
            >
              Save as a Draft
            </Button>
            <Button
              variant="solid"
              colorPalette={"green"}
              name="status"
              value={"published"}
              type="submit"
            >
              Publish the Blog
            </Button>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </>
  );
}
