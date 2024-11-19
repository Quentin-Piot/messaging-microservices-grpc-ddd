import { PropsWithChildren } from "react";
import { Box, Text } from "@chakra-ui/react";


const App = ({ children }: PropsWithChildren) => {

  return (
    <Box w="100vw" h="100vh" bg={"$accentBackground"} display={"flex"} justifyContent={"center"} bgColor={"gray.100"}
          alignItems={"center"} position={'relative'}>
      <Text position={'fixed'} bottom={2} left={2} fontSize={'xs'}>
        {APP_VERSION}
      </Text>
      {children}
    </Box>
  );
};

export default App;
