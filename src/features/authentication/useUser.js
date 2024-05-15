import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import customFetch from "../../utils/baseUrl";
export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
  const isAuthenticated = !!user;
  return { isLoading, user, isAuthenticated };
}

const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await customFetch("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
