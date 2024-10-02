export const logger = {
  err: (message: string, ...optionalParams: any[]): void => {
    console.error(message, ...optionalParams);
  },
  log: (message: string, ...optionalParams: any[]): void => {
    console.log(message, ...optionalParams);
  },
};
