import { User } from "./model";

const isLoggedIn = () => {
  return (localStorage.getItem("user") != undefined && localStorage.getItem("token") != undefined)
}

const getLoggedInuser = () => {
  const user: User = JSON.parse(localStorage.getItem('user'))
  return user
}

const logOut = () => {
  localStorage.clear()
}

export {isLoggedIn, getLoggedInuser, logOut}