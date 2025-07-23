import {
  Box,
  Text,
  Heading,
  Checkbox,
  Button,
  Popover,
  Portal,
  Flex,
  Center,
  EmptyState,
  VStack,
  Editable,
  IconButton,
  RadioCard,
  Icon,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import Header from "./components/ui/Header";
import { useApiMutation, useApiQuery } from "./api/hooks/useApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useToast } from "./components/ui/toasterNew";
import { PiEmpty } from "react-icons/pi";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import DeepseekIcon from "./components/ui/icons/DeepseekIcon";
import ChatGPTIcon from "./components/ui/icons/ChatGPTIcon";
import { SiClaude } from "react-icons/si";
import { Tooltip } from "./components/ui/tooltip";
import Markdown from "react-markdown";

const PromptPage = () => {
  const [searchParams] = useSearchParams();
  const promptId = searchParams.get("promptId");
  const navigate = useNavigate();
  const toast = useToast();
  const [isPublic, setIsPublic] = useState<boolean>();
  const [selectedRadio, setSelectedRadio] = useState<string>("Deepseek");
  const [LLMContent, setLLMContent] = useState<string>(
    "Here will appear content from chosen LLM"
  );
  let loadingToastId = null;

  const items = [
    {
      value: "Deepseek",
      title: "Deepseek",
      icon: <DeepseekIcon />,
      disable: false,
      tooltip: "Try",
    },
    {
      value: "Chat-GPT",
      title: "Chat-GPT",
      icon: <ChatGPTIcon />,
      disable: true,
      tooltip: "Comeback soon!",
    },
    {
      value: "Claude",
      title: "Claude",
      icon: <SiClaude />,
      disable: true,
      tooltip: "Comeback soon!",
    },
  ];

  const {
    data: prompt,
    isLoading,
    error,
  } = useApiQuery(["prompt", promptId], `/prompt?promptId=${promptId}`);

  useEffect(() => {
    if (prompt) {
      setIsPublic(prompt.public);
    }
  }, [prompt]);

  const deletePromptMutation = useApiMutation(
    (id) => `/prompt?promptId=${id}`,
    "DELETE",
    {
      invalidateQueries: ["prompts", "public-prompts", ["prompt", promptId]],
      onSuccess: () => {
        toast.success(
          "Prompt deleted!",
          "Your prompt has been successfully deleted."
        );

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      },
      onError: () => {
        toast.error("Error occured", error);
      },
    }
  );

  const handleDelete = (promptId) => {
    deletePromptMutation.mutate(promptId);
  };

  const updatePromptMutation = useApiMutation(
    (data) => `/prompt?promptId=${data.promptId}`,
    "PUT",
    {
      invalidateQueries: ["prompts", "public-prompts", ["prompt", promptId]],
      onSuccess: () => {
        toast.success(
          "Prompt updated!",
          "Your prompt has been successfully updated."
        );

        setIsPublic(prompt.isPublic);
      },
      onError: (error) => {
        toast.error("Error occured", error.message);
      },
    }
  );

  const handleUpdate = (promptId, updateData) => {
    updatePromptMutation.mutate({
      promptId: promptId,
      ...updateData,
    });
  };

  const postLLMMutation = useApiMutation(
    (data) => `/llm?promptId=${data.promptId}`,
    "POST",
    {
      invalidateQueries: ["LLM"],
      onSuccess: (responseData) => {
        if (loadingToastId) {
          toast.close(loadingToastId);
          loadingToastId = null;
        }
        toast.success("LLM!", "Your prompt has been successfully sent to LLM.");
        setLLMContent(responseData);
      },
      onPending: () => {
        loadingToastId = toast.loading("Your prompt is being sent to LLM.");
      },
      onError: (error) => {
        if (loadingToastId) {
          toast.close(loadingToastId);
          loadingToastId = null;
        }
        toast.error("Error occurred", error.message);
      },
    }
  );

  const handlePostLLM = (promptId) => {
    postLLMMutation.mutate(promptId);
  };

  if (isLoading) return <div>LOADING</div>;

  return (
    <Box>
      <Header />

      <Box
        p={6}
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid"
        borderColor="orange.100"
        maxW="2xl"
        mx="auto"
        _hover={{
          boxShadow: "xl",
          borderColor: "orange.200",
          transform: "translateY(-2px)",
        }}
        transition="all 0.2s ease-in-out"
      >
        <Heading size="xl" color="orange.800" mb={4} fontWeight="bold">
          <Editable.Root
            submitMode="none"
            defaultValue={prompt.title || "Missing title"}
            onValueCommit={(newValue) => {
              const title = newValue.value;
              handleUpdate(promptId, { title });
            }}
          >
            <Editable.Preview />
            <Editable.Input />
            <Editable.Control>
              <Editable.EditTrigger asChild>
                <IconButton variant="ghost" size="xs">
                  <LuPencilLine />
                </IconButton>
              </Editable.EditTrigger>
              <Editable.CancelTrigger asChild>
                <IconButton variant="outline" size="xs">
                  <LuX />
                </IconButton>
              </Editable.CancelTrigger>
              <Editable.SubmitTrigger asChild>
                <IconButton variant="outline" size="xs">
                  <LuCheck />
                </IconButton>
              </Editable.SubmitTrigger>
            </Editable.Control>
          </Editable.Root>
        </Heading>

        <Text color="gray.700" lineHeight="1.7" mb={6} fontSize="md">
          <Editable.Root
            submitMode="none"
            defaultValue={prompt.content || "Missing content"}
            onValueCommit={(newValue) => {
              const content = newValue.value;
              handleUpdate(promptId, { content });
            }}
          >
            <Editable.Preview />
            <Editable.Textarea rows={4} />
            <Editable.Control>
              <Editable.EditTrigger asChild>
                <IconButton variant="ghost" size="xs">
                  <LuPencilLine />
                </IconButton>
              </Editable.EditTrigger>
              <Editable.CancelTrigger asChild>
                <IconButton variant="outline" size="xs">
                  <LuX />
                </IconButton>
              </Editable.CancelTrigger>
              <Editable.SubmitTrigger asChild>
                <IconButton variant="outline" size="xs">
                  <LuCheck />
                </IconButton>
              </Editable.SubmitTrigger>
            </Editable.Control>
          </Editable.Root>
        </Text>

        <Box
          p={3}
          bg="orange.50"
          borderRadius="lg"
          border="1px solid"
          borderColor="orange.100"
        >
          <Checkbox.Root
            colorPalette="orange"
            checked={isPublic}
            onCheckedChange={(details) => {
              const isPublic = details.checked;
              setIsPublic({ isPublic });
              handleUpdate(prompt.promptId, { isPublic });
            }}
            size="lg"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Label
              color="orange.800"
              fontWeight="medium"
              fontSize="sm"
            >
              Public prompt?
            </Checkbox.Label>
            <Checkbox.Control />
          </Checkbox.Root>
        </Box>
        <Flex pt={2} justify={"flex-end"}>
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button size="sm" variant="outline" colorPalette={"red"}>
                <MdDelete />
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <Popover.Title fontWeight="medium">Delete</Popover.Title>
                    <Text my="4">Do you want to delete prompt?</Text>
                    <Flex justify={"flex-end"}>
                      <Button mr={2}>No</Button>
                      <Button
                        colorPalette={"red"}
                        loading={deletePromptMutation.isPending}
                        disabled={deletePromptMutation.isPending}
                        onClick={() => {
                          handleDelete(promptId);
                        }}
                      >
                        Yes
                      </Button>
                    </Flex>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </Flex>
      </Box>

      <Center mt={8}>Try your prompt in LLM!</Center>

      <Flex justify={"center"} mt={8} mb={4}>
        <RadioCard.Root
          orientation="horizontal"
          align="center"
          justify="center"
          maxW="lg"
          defaultValue="Deepseek"
          value={selectedRadio}
          onValueChange={(details) => {
            setSelectedRadio(details.value);
          }}
        >
          <HStack align="stretch">
            {items.map((item) => (
              <Tooltip content={item.tooltip}>
                <RadioCard.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disable}
                >
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <Icon fontSize="2xl" color="fg.subtle">
                      {item.icon}
                    </Icon>
                    <RadioCard.ItemText ms="-4">
                      {item.title}
                    </RadioCard.ItemText>
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              </Tooltip>
            ))}
          </HStack>
        </RadioCard.Root>

        <Button
          background={"orange"}
          onClick={() => {
            handlePostLLM({ promptId });
          }}
          mt={4}
          ml={6}
        >
          Send
        </Button>
      </Flex>

      <Flex
        justify={"center"}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor="orange.200"
        maxW="2xl"
        mx="auto"
      >
        <Box width="100%">
          <Markdown>{LLMContent}</Markdown>
        </Box>
      </Flex>

      {/* previous versions */}
      <Center pb={5} pt={5}>
        <Text>Previous versions</Text>
      </Center>
      {prompt.versions.length === 0 ? (
        <Flex>
          <EmptyState.Root>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <PiEmpty />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>
                  Prompt's previous versions are empty
                </EmptyState.Title>
                <EmptyState.Description>
                  After change, previous version will appear there
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        </Flex>
      ) : (
        <Box>
          {prompt.versions.map((version) => (
            <Box
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor="orange.100"
              maxW="2xl"
              mx="auto"
              _hover={{
                boxShadow: "xl",
                borderColor: "orange.200",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s ease-in-out"
            >
              <Heading size="xl" color="orange.800" mb={4} fontWeight="bold">
                {version.title}
              </Heading>

              <Text color="gray.700" lineHeight="1.7" mb={6} fontSize="md">
                {version.content}
              </Text>

              <Box
                p={3}
                bg="orange.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="orange.100"
              >
                <Checkbox.Root
                  colorPalette="orange"
                  checked={version.public}
                  readOnly
                  size="lg"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Label
                    color="orange.800"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    Public prompt?
                  </Checkbox.Label>
                  <Checkbox.Control />
                </Checkbox.Root>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PromptPage;
