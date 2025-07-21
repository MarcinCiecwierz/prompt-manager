import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  IconButton,
  Pagination,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useApiQuery } from "./api/hooks/useApi";
import Header from "./components/ui/Header";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useMemo, useState, useEffect } from "react";
import ShowPrompts from "./components/ui/showPrompts";

const Home = () => {
  const navigate = useNavigate();

  const {
    data: prompts,
    isLoading,
    error,
  } = useApiQuery(["prompts"], "/prompt/all");

  const { data: publicPrompts, isLoading: publicPromptsLoading } = useApiQuery(
    ["public-prompts"],
    "/prompt/public"
  );

  return (
    <Box>
      <Header />

      <Flex minH="dvh" justify="center" width="full">
        <Tabs.Root defaultValue="My prompts" width="80%">
          <Tabs.List justifyContent="center">
            <Tabs.Trigger key={"myPrompts"} value={"My prompts"}>
              My prompts
            </Tabs.Trigger>
            <Tabs.Trigger key={"publicPrompts"} value={"Public prompts"}>
              Public prompts
            </Tabs.Trigger>
          </Tabs.List>
          <Box pos="relative" minH="200px" width="full">
            <Tabs.Content
              key={"myPrompts"}
              value={"My prompts"}
              position="absolute"
              inset="0"
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              <ShowPrompts prompts={prompts} isLoading={isLoading} />
            </Tabs.Content>
            <Tabs.Content
              key={"publicPrompts"}
              value={"Public prompts"}
              position="absolute"
              inset="0"
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              <ShowPrompts
                prompts={publicPrompts}
                isLoading={publicPromptsLoading}
              />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Box>
  );
};

export default Home;
