export const getErrorMessage = (error) => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    return error?.message || "An unknown error occurred";
}