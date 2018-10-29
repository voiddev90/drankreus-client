import { User, Option } from "./model"

const isLoggedIn = () => {
  return (
    localStorage.getItem("user") != undefined &&
    localStorage.getItem("token") != undefined
  )
}

const getLoggedInuser = () => {
  const user: User = JSON.parse(localStorage.getItem("user"))
  return user
}

const logOut = () => {
  localStorage.clear()
}

function OptionIsSome<T>(value: Option<T>) : boolean {
  return value.type == "some"
}

export { isLoggedIn, getLoggedInuser, logOut, OptionIsSome }
