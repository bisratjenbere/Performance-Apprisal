import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import customFetch from "../../utils/baseUrl";
const loginAction = async ({ email, password }) => {
  try {
    const response = await customFetch.post("/users/login", {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      throw new Error("No data found in the response");
    }
  } catch (error) {
    throw error;
  }
};

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAction({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data);
      navigate("/admin", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      let message =
        err?.response?.data?.msg || "Server error. Please try again later.";

      if (err.code === "ERR_BAD_RESPONSE")
        message = "Server error. Please try again later.";
      toast.error(message);
    },
  });

  return { login, isLoading };
}
