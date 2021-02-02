export const storeTokenInfo = (tokenObject) => {
  const tokenInfo = { ...tokenObject, date_created: Date.now(), date: (new Date()).toLocaleString() }; // Extract token information
  localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo)); // Store token information in local storage
  return tokenInfo;
};