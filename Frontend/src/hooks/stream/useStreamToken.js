import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../../lib/api";

const useStreamToken = () => {
  const { data } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // This will run only when authUser is available
  });
  return { tokenData: data };
};

export default useStreamToken;
