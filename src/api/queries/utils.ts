// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ValidPath<S extends string> = S extends `/${infer Rest}` ? never : S;

export const getUrlPath = <S extends string>(subDomain: ValidPath<S>) => {
  const URL = process.env.REACT_APP_API_URL;
  return `${URL}/api/${subDomain}`;
};
