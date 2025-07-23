import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Heading,
  Menu,
  Portal,
  Stack,
  Text,
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
      <Flex gap={4}>
        <Flex onClick={() => navigate("/prompt/add")} alignItems="center">
          <Button variant="ghost">
            <FiPlusCircle />
            Add prompt
          </Button>
        </Flex>
        <Flex onClick={() => navigate("/home")} alignItems="center">
          <Button variant="ghost">
            <FiList />
            All prompts
          </Button>
        </Flex>
      </Flex>
      <Stack>
        <SkeletonCircle loading={isLoading}>
          <Menu.Root>
            <Menu.Trigger>
              <Flex gap={"2"} direction="row" alignItems={"center"}>
                {user?.name}
                <AvatarGroup>
                  <Avatar.Root size={"sm"}>
                    <Avatar.Fallback name={user?.name} />
                    <Avatar.Image src={user?.picture} />
                  </Avatar.Root>
                </AvatarGroup>
              </Flex>
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
