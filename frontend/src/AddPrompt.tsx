import {
  Box,
  Button,
  Checkbox,
  Input,
  Textarea,
  Heading,
  Stack,
  Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useApiMutation } from "./api/hooks/useApi";
import { useNavigate } from "react-router-dom";
import { useToast } from "./components/ui/toasterNew";
import Header from "./components/ui/Header";

interface FormValues {
  title: string;
  content: string;
  isPublic: boolean;
}

const AddPrompt = () => {
  const { register, handleSubmit, control } = useForm<FormValues>();
  const navigate = useNavigate();
  const toast = useToast();

  const postPromptMutation = useApiMutation("/prompt", "POST", {
    invalidateQueries: ["prompts", "public-prompts"],
    onSuccess: () => {
      toast.success(
        "Prompt Created!",
        "Your prompt has been successfully created."
      );

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const payload = {
      title: data.title,
      content: data.content,
      isPublic: Boolean(data.isPublic),
    };

    postPromptMutation.mutate(payload);
  });

  return (
    <Box>
      <Header />
      <Box
        p={8}
        // bg="white"
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid"
        borderColor="orange.100"
        maxW="800px"
        w="full"
        mx="auto"
        _hover={{
          boxShadow: "xl",
          borderColor: "orange.200",
        }}
        transition="all 0.2s ease-in-out"
      >
        <form onSubmit={onSubmit}>
          <Stack gap={6} mt={4}>
            <Heading
              size="xl"
              color="orange.800"
              fontWeight="bold"
              letterSpacing="tight"
              textAlign="center"
            >
              Add a new prompt
            </Heading>

            <Field.Root>
              <Field.Label color="orange.800" fontWeight="medium" fontSize="sm">
                Title
              </Field.Label>
              <Input
                placeholder="Enter title"
                size="lg"
                background="orange.50"
                border="2px solid"
                borderColor="orange.100"
                borderRadius="lg"
                _hover={{
                  borderColor: "orange.200",
                }}
                _focus={{
                  borderColor: "orange.400",
                  boxShadow: "0 0 0 1px var(--colors-orange-400)",
                }}
                {...register("title")}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color="orange.800" fontWeight="medium" fontSize="sm">
                Content
              </Field.Label>
              <Textarea
                placeholder="Enter your prompt..."
                size="lg"
                rows={6}
                resize="vertical"
                background="orange.50"
                border="2px solid"
                borderColor="orange.100"
                borderRadius="lg"
                _hover={{
                  borderColor: "orange.200",
                }}
                _focus={{
                  borderColor: "orange.400",
                  boxShadow: "0 0 0 1px var(--colors-orange-400)",
                }}
                {...register("content")}
              />
            </Field.Root>

            <Box
              p={4}
              bg="orange.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="orange.100"
            >
              <Checkbox.Root
                colorPalette="orange"
                size="lg"
                {...register("isPublic")}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label
                  color="orange.800"
                  fontWeight="medium"
                  fontSize="sm"
                >
                  Public prompt
                </Checkbox.Label>
              </Checkbox.Root>
            </Box>

            <Button
              type="submit"
              size="lg"
              bg="orange.400"
              color="white"
              borderRadius="xl"
              fontWeight="bold"
              loading={postPromptMutation.isPending}
              _hover={{
                bg: "orange.500",
                transform: "translateY(-1px)",
              }}
              _active={{
                bg: "orange.600",
                transform: "translateY(0)",
              }}
              transition="all 0.2s ease-in-out"
            >
              Add prompt
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddPrompt;
