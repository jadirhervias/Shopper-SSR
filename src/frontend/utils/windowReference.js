export const isRunningOnServerSide = () => {
  return typeof window === 'undefined';
};

export const isRunningOnClientSide = () => {
  return typeof window !== 'undefined';
};
