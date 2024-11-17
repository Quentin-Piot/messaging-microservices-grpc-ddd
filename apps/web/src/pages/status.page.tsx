import DemoLayout from "../templates/unauthenticated/demo.layout.tsx";
import { Card, List } from "@chakra-ui/react";
import { LuCheckCircle } from "react-icons/lu";
import { PropsWithChildren } from "react";

const Indicator = () => <List.Indicator asChild color="green.500"><LuCheckCircle /></List.Indicator>;
const Item = ({ children }: PropsWithChildren) => <List.Item><Indicator />{children}</List.Item>;
const StatusPage = () => {

  return <DemoLayout>
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Card.Title mt="2" textAlign="center">Backend status</Card.Title>
        <Card.Description>
          <List.Root gap="2" variant="plain" align="center">
            <Item> API Gateway </Item> <Item> User Service </Item>

          </List.Root>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  </DemoLayout>;
};


export default StatusPage;