import { useQuery } from "@tanstack/react-query";
import { request } from "apis/client";



// ####################### Get Colors #######################


export function useGetColors() {
  return useQuery({
    queryKey: ["get-companies"],
    queryFn: getCompanies,
  });
}
