import { Card, Container, Flex, Separator, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { LuCheckCircle, LuStopCircle } from "react-icons/lu";

import { getHealthStatus } from "@/api/health/health.api";
import MainLayout from "@/templates/main.layout";

const Indicator = ({ isUp }: { isUp: boolean }) =>
  isUp ? (

    <Text color={"green.500"}><LuCheckCircle /></Text>
  ) : (

    <Text color={"red.500"}> <LuStopCircle /></Text>
  );
const Item = ({ isUp, children }: PropsWithChildren<{ isUp: boolean }>) => (
  <Flex alignItems="center" gap={3}>
    <Indicator isUp={isUp} />
    {children}
  </Flex>
);

const isServiceUp = (health: any, service: string): boolean => {
  if (!health) return false;
  return health[service] && health[service].servingStatus === "SERVING";
};

export default function Home() {
  const { data } = useQuery({
    queryKey: ["health"],
    queryFn: getHealthStatus,
    refetchInterval: 5000,
  });
  return (
    <MainLayout><Container width="md">
      <Card.Root width="100%" >
        <Card.Body >
          <Card.Title mt="2" textAlign="center" >
            Backend status
          </Card.Title>
          <Separator  mt={1} mb={6} borderColor="gray.400" />
          <Item isUp={!!data}> API Gateway </Item>
          <Item isUp={isServiceUp(data, "user_service")}>
            User service
          </Item>
        </Card.Body>
      </Card.Root></Container>
    </MainLayout>
  );
};

