export const isUserLogined = () => {
  if (localStorage.getItem('user')) {
    return true;
  } else {
    return false;
  }
};
