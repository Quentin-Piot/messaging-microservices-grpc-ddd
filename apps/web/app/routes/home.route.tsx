import Home from "@/containers/home";
import { Route } from "../../.react-router/types/app/+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Eco-Travel" },
    { name: "description", content: "Bienvenue sur EcoTravelPlanner, le plannificateur de voyages éco-responsables" },
  ];
}

export default function HomeRoute() {
  return <Home />;
}
