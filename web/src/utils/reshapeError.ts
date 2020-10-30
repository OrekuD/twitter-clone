export const reshapeError = (errors: { field: string; message: string }) => {
  return {
    [errors.field]: errors.message,
  };
};
