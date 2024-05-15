import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/baseUrl";

export function useGet(collectionName) {
  const {
    isLoading,
    data: collectionData,
    error,
  } = useQuery({
    queryKey: [collectionName],
    queryFn: () => fetchCollection(collectionName),
  });

  return { isLoading, collectionData, error };
}

const fetchCollection = async (collectionName) => {
  try {
    const token = localStorage.getItem("token");
    const response = await customFetch.get(`/${collectionName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
