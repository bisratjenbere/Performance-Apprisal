import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import customFetch from "../../utils/baseUrl";
const resetPasswordAction = async ({ password, token }) => {
  try {
    const response = await customFetch.patch(`users/resetPassword/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: ({ password, token }) =>
      resetPasswordAction({ password, token }),
    onSuccess: () => {
      toast.success("Password Successfully Reset!");
      navigate("/login");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Oops! Something went wrong. Please try again later.");
    },
  });

  return { resetPassword, isLoading };
}
