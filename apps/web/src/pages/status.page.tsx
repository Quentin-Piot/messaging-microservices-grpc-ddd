import { Card, List } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { LuCheckCircle, LuStopCircle } from "react-icons/lu";

import { getHealthStatus } from "@/api/health/health.api.ts";
import DemoLayout from "../templates/unauthenticated/demo.layout.tsx";

const Indicator = ({ isUp }: { isUp: boolean }) =>
  isUp ? (
    <List.Indicator mt={2} color="green.500">
      {" "}
      <LuCheckCircle />
    </List.Indicator>
  ) : (
    <List.Indicator mt={2} color="red.500">
      {" "}
      <LuStopCircle />
    </List.Indicator>
  );
const Item = ({ isUp, children }: PropsWithChildren<{ isUp: boolean }>) => (
  <List.Item>
    <Indicator isUp={isUp} />
    {children}
  </List.Item>
);

const isServiceUp = (health: any, service: string): boolean => {
  if (!health) return false;
  return health[service] && health[service].servingStatus === "SERVING";
};

const StatusPage = () => {
  const { data } = useQuery({
    queryKey: ["health"],
    queryFn: getHealthStatus,
    refetchInterval: 5000,
  });
  return (
    <DemoLayout>
      <Card.Root width="320px">
        <Card.Body gap="2">
          <Card.Title mt="2" textAlign="center">
            Backend status
          </Card.Title>
          <Card.Description>
            <List.Root gap="2" variant="plain" align="center">
              <Item isUp={!!data}> API Gateway </Item>
              <Item isUp={isServiceUp(data, "user_service")}>
                {" "}
                User service{" "}
              </Item>
            </List.Root>
          </Card.Description>
        </Card.Body>
      </Card.Root>
    </DemoLayout>
  );
};

export default StatusPage;
