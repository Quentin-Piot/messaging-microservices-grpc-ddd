import { Spinner, TamaguiProvider, View, Text } from "tamagui";
import tamaguiConfig from "./tamagui.config.ts";




function App() {

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View w="100vw" h="100vh" bg={"$accentBackground"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
  <Spinner ml={0} mr={0} mt={0} mb={0} size={'large'}/>
        <Text fontSize={16} fontWeight={700} mt={10}>Coming soon ...</Text>
      </View>
    </TamaguiProvider>
  );
}

export default App;
