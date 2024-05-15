import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const logoutApi = async () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    throw error;
  }
};

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(["current-user"]);
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
