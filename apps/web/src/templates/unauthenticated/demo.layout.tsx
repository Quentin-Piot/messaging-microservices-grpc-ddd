import { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";


const App = ({ children }: PropsWithChildren) => {

  return (
    <Box w="100vw" h="100vh" bg={"$accentBackground"} display={"flex"} justifyContent={"center"} bgColor={"gray.100"}
          alignItems={"center"}>
      {children}
    </Box>
  );
};

export default App;
