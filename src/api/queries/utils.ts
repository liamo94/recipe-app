export const getUrlPath = (subDomain: string) => {
  const URL = process.env.REACT_APP_API_URL;
  return `${URL}/api/${subDomain}?format=json`;
};
