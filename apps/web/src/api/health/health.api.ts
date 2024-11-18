import api from "@/api/helpers/api.ts";

export const getHealthStatus = () => {

  return api.get('health').then((data:any) => {
    return data.details;
  })
}