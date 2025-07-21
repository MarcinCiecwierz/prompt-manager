import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  Menu,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SkeletonCircle } from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { FiList } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const { user, isLoading, logout } = useAuth0();
  const navigate = useNavigate();

  return (
    <Flex gap="4" justify={"space-between"} padding={4}>
      <Heading>LOGO TEXT</Heading>
      <Box>
        <Menu.Root>
          <Menu.Trigger>PROMPTS</Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="add prompt"
                  onClick={() => navigate("/prompt/add")}
                >
                  <FiPlusCircle />
                  Add prompt
                </Menu.Item>
                <Menu.Item value="home" onClick={() => navigate("/home")}>
                  <FiList />
                  All prompts
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
      <Stack>
        <SkeletonCircle loading={isLoading}>
          <Menu.Root>
            <Menu.Trigger>
              <Stack gap={"2"} direction="row" align="flex-start">
                {user?.name}
                <AvatarGroup>
                  <Avatar.Root size={"sm"}>
                    <Avatar.Fallback name={user?.name} />
                    <Avatar.Image src={user?.picture} />
                  </Avatar.Root>
                </AvatarGroup>
              </Stack>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="profile"
                    onClick={() => navigate("/profile")}
                  >
                    <MdOutlineAccountCircle />
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    value="logout"
                    onClick={() => logout()}
                    color="gray.400"
                  >
                    <MdLogout />
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </SkeletonCircle>
      </Stack>
    </Flex>
  );
};

export default Header;
