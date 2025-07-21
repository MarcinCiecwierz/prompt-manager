import React from "react";
import Header from "./components/ui/Header";
import { Box, DataList, VStack } from "@chakra-ui/react";
import { Avatar, AvatarGroup, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) return <div>loading</div>;
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
        <VStack gap={4}>
          <AvatarGroup>
            <Avatar.Root>
              <Avatar.Fallback name={user?.name} />
              <Avatar.Image src={user?.picture} />
            </Avatar.Root>
          </AvatarGroup>
          <DataList.Root orientation={"vertical"}>
            <DataList.Item key={user?.sub}>
              <DataList.ItemLabel>Nickname</DataList.ItemLabel>
              <DataList.ItemValue>{user?.name}</DataList.ItemValue>
              <DataList.ItemLabel>Email</DataList.ItemLabel>
              <DataList.ItemValue>{user?.email}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </VStack>
      </Box>
    </Box>
  );
};

export default Profile;
