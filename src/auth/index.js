export function storeToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function getToken() {
  const myToken = JSON.parse(localStorage.getItem("token"));
  return myToken;
}

export function storeUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const myUser = JSON.parse(localStorage.getItem("user"));
  return myUser;
}

export function storeSeller(seller) {
  localStorage.setItem("seller", JSON.stringify(seller));
}

export function getSeller() {
  const mySeller = JSON.parse(localStorage.getItem("seller"));
  return mySeller;
}

export function storeAdmin(admin) {
  localStorage.setItem("admin", JSON.stringify(admin));
}

export function getAdmin() {
  const myAdmin = JSON.parse(localStorage.getItem("admin"));
  return myAdmin;
}
