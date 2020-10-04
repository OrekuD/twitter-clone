export const convertError = (errors: { field: string; message: string }) => {
  return {
    [errors.field]: errors.message,
  };
};
