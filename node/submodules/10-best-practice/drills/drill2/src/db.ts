export let dbConnected = true;

export const checkDbConnection = async (): Promise<boolean> => {
  if (!dbConnected) throw new Error("DB is down");
  return true;
};

export const disconnectDb = () => {
  dbConnected = false;
};
export const connectDb = () => {
  dbConnected = true;
};
