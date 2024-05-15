import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useMutationWithToast = ({
  mutationFn,
  mutationKey,
  successMessage,
  errorMessage,
  invalidateQueries,
  redirectPath,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn,
    mutationKey,
    onSuccess: () => {
      if (invalidateQueries) {
        queryClient.invalidateQueries(invalidateQueries);
      }
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      }
      if (successMessage) {
        toast.success(successMessage);
      }
    },
    onError: (err) => {
      console.error("ERROR", err);

      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { mutate, isLoading };
};
