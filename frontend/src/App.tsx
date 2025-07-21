import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { createApiClient } from "./api/client";
import { useApiClient } from "./api/hooks/useApiClient";

const App = () => {
  const { loginWithRedirect } = useAuth0();

  const loginWithAuthInBackend = () => {
    loginWithRedirect;
    const apiClient = useApiClient();
    apiClient
      .get("/auth/me")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box>
      <Center>
        <Text textStyle="5xl">LOGO TEXT</Text>
      </Center>
      <Center minH="80vh" px="10px">
        <Box>
          <Text textStyle="7xl" textAlign="center">
            Store all{" "}
            <Text as="span" color="orange.400">
              prompts
            </Text>{" "}
            in one place
          </Text>

          <Text textStyle="2xl" textAlign="center">
            Do you feel overwhelmed with remembering every prompt?
          </Text>
          <Text textStyle="2xl" textAlign="center">
            Feel free to create an account and store it in one place!
          </Text>

          <Center>
            <Button
              bg="orange.500"
              color="white"
              textAlign="center"
              onClick={() => loginWithRedirect()}
            >
              Sign In
            </Button>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default App;
