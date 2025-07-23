import {
  Box,
  ButtonGroup,
  Center,
  EmptyState,
  Flex,
  IconButton,
  Pagination,
  SimpleGrid,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { PiEmpty } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ShowPrompts = ({ prompts, isLoading }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalItems = prompts?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentPrompts = useMemo(() => {
    if (!prompts || prompts.length === 0) return [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return prompts.slice(startIndex, endIndex);
  }, [prompts, currentPage, itemsPerPage]);

  useEffect(() => {
    if (!isLoading && prompts?.length > 0) {
      setCurrentPage(1);
    }
  }, [isLoading, prompts?.length]);

  const handlePageChange = (details) => {
    setCurrentPage(details.page);
  };

  return (
    <Box>
      <Center>
        {isLoading ? (
          <SimpleGrid columns={[2, null, 4]} gap="40px">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonText
                key={index}
                w="200px"
                aspectRatio={1}
                borderRadius="xl"
                noOfLines={7}
              />
            ))}
          </SimpleGrid>
        ) : currentPrompts.length === 0 ? (
          <Flex>
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <PiEmpty />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>You have no prompts saved</EmptyState.Title>
                  <EmptyState.Description>
                    New prompt will appear here
                  </EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          </Flex>
        ) : (
          <SimpleGrid columns={[2, null, 4]} gap="40px">
            {currentPrompts.map((prompt) => (
              <Box
                key={prompt.promptId}
                w="200px"
                aspectRatio={1}
                bg="orange.200"
                borderRadius="xl"
                boxShadow="md"
                p={4}
                cursor="pointer"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
                onClick={() => navigate(`/prompt?promptId=${prompt.promptId}`)}
              >
                <Flex direction="column" justify={"space-between"} gap={10}>
                  <Text textStyle={"sm"}>{prompt.title}</Text>
                  <Text lineClamp="2" textStyle={"sm"}>
                    {prompt.content}
                  </Text>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Center>
      {!isLoading && totalPages > 1 && (
        <Center mt={8}>
          <Pagination.Root
            count={totalItems}
            pageSize={itemsPerPage}
            page={currentPage}
            onPageChange={handlePageChange}
          >
            <ButtonGroup variant="ghost" size="sm">
              <Pagination.PrevTrigger asChild>
                <IconButton>
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton
                    variant={
                      page.type === "page" && page.value === currentPage
                        ? "outline"
                        : "ghost"
                    }
                    key={page.value}
                  >
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton>
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Center>
      )}

      {!isLoading && totalItems > 0 && (
        <Center mt={4}>
          <Text color="gray.600" fontSize="sm">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
            -{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            prompts
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default ShowPrompts;
