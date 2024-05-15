import { useMutationWithToast } from "./useMutationWithToast";
import { performEntityAction } from "../utils/performEntityAction";

export const useAddEntity = ({
  method,
  endpoint,
  mutationKey,
  successMessage,
  errorMessage,
  invalidateQueries,
  redirectPath,
}) => {
  const action = async (data) => {
    try {
      return await performEntityAction(method, endpoint, data);
    } catch (error) {
      throw error;
    }
  };

  const { isLoading, mutate } = useMutationWithToast({
    mutationFn: action,
    mutationKey,
    successMessage,
    errorMessage,
    invalidateQueries,
    redirectPath,
  });

  const addEntity = async (data) => mutate(data);

  return { isLoading, addEntity };
};

export const useDeleteEntity = ({
  method,
  endpoint,
  mutationKey,
  successMessage,
  errorMessage,
  invalidateQueries,
  redirectPath,
}) => {
  const action = async (id) => {
    try {
      return await performEntityAction(method, `${endpoint}/${id}`);
    } catch (error) {
      throw error;
    }
  };

  const { mutate, isLoading } = useMutationWithToast({
    mutationFn: action,
    mutationKey,
    successMessage,
    errorMessage,
    invalidateQueries,
    redirectPath,
  });

  const deleteEntity = async (id) => {
    mutate(id);
  };
  return { deleteEntity, isLoading };
};

export const useUpdateEntity = ({
  method,
  endpoint,
  mutationKey,
  successMessage,
  errorMessage,
  invalidateQueries,
  redirectPath,
  type,
}) => {
  const action = async (updateData) => {
    try {
      if (type === "many") {
        return await performEntityAction(
          method,
          `${endpoint}/${"660959dc4482a6bd00331685"}`,
          updateData.data
        );
      }

      return await performEntityAction(
        method,
        `${endpoint}/${updateData.id}`,
        updateData.data
      );
    } catch (error) {
      throw error;
    }
  };

  const { mutate, isLoading } = useMutationWithToast({
    mutationFn: action,
    mutationKey,
    successMessage,
    errorMessage,
    invalidateQueries,
    redirectPath,
  });
  const updateEntity = async (id, data) => {
    const updateData = { id, data };

    mutate(updateData);
  };
  return { isLoading, updateEntity };
};
