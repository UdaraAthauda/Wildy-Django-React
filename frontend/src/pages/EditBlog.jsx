import api from "@/api";
import ImageUploader from "@/components/ImageUploader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
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
  HStack,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    snake: null,
    content: "",
    featured_image: null,
    status: "draft",
  });

  const getData = async () => {
    try {
      const res = await api.get(`blogs/blog/${id}/`);
      setData(res.data);

      setFormData({
        title: res.data.title,
        snake: res.data.snake,
        content: res.data.content,
        featured_image: res.data.featured_image,
        status: res.data.status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

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

    if (status === "published") {
      setPublishing(true);
    } else {
      setSaving(true);
    }

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
    } finally {
      setPublishing(false);
      setSaving(false);
    }
  };

  if (data.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Heading
        fontSize={{ base: "md", md: "2xl" }}
        textAlign={{ base: "center", md: "start" }}
      >
        Edit Your Own Blog Posts
      </Heading>

      <Flex justify={"center"} align={"center"} mt={5}>
        <Card.Root
          as={"form"}
          onSubmit={handleSubmit}
          w={{ base: "full", md: "80%" }}
          shadow={"xl"}
        >
          <Card.Header>
            <Card.Title color={"teal.500"}>Edit/Update or Remove</Card.Title>
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

              <HStack flexDir={{ base: "column", md: "row" }} gap={5}>
                <Field.Root flex={1}>
                  <Field.Label>Featured Image(Optional)</Field.Label>
                  <ImageUploader onFileSelect={handleImageChange} />
                </Field.Root>

                {formData.featured_image ? (
                  <Image
                    src={formData.featured_image}
                    flex={1}
                    alt="Featured_image"
                    h={"300px"}
                    borderRadius={"md"}
                  />
                ) : (
                  <Box
                    flex={{base: "none", md: 1}}
                    h="200px"
                    w={'full'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px dashed gray"
                    borderRadius="md"
                  >
                    <Text>No Featured Image</Text>
                  </Box>
                )}
              </HStack>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            {formData.status === 'draft' && (
            <Button
              variant="outline"
              name="status"
              value={"draft"}
              type="submit"
              loading={saving}
              loadingText="Saving Draft..."
            >
              Save as a Draft
            </Button>
            )}

            <Button
              variant="solid"
              colorPalette={"green"}
              name="status"
              value={"published"}
              type="submit"
              loading={publishing}
              loadingText="Publishing Blog..."
            >
              Publish the Blog
            </Button>

            <Button variant={'subtle'} colorPalette={'red'}>Delete Blog</Button>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </>
  );
}
