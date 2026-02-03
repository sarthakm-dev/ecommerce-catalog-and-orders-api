export const validateCreateUser = (data: any) => {
  if (!data.name || !data.email || !data.password) {
    throw new Error("Name, email and password are required");
  }
};