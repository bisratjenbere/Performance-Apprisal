import customFetch from "./baseUrl";
export const performEntityAction = async (method, endpoint, entityData) => {
  const token = localStorage.getItem("token");
  let response;

  switch (method.toLowerCase()) {
    case "post":
      response = await customFetch.post(endpoint, entityData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      break;
    case "patch":
      response = await customFetch.patch(endpoint, entityData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      break;
    case "delete":
      response = await customFetch.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response;

    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }

  if (response.data) {
    return response.data;
  } else {
    throw new Error("No data found in the response");
  }
};
