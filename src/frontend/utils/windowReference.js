export const isRunningOnServerSide = () => {
  const res = typeof window === 'undefined';
  if (res === true) return true;
  return false;
};

export const isRunningOnClientSide = () => {
  const res = typeof window !== 'undefined';
  if (res === true) return true;
  return false;
};
