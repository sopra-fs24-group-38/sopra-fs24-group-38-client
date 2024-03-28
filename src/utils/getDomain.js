import { isProduction } from "./isProduction"

export const getDomain = () => {
  const prodUrl = "https://sopra-fs24-group-38-server.oa.r.appspot.com/"
  const devUrl = "http://localhost:8080"

  return isProduction() ? prodUrl : devUrl
}

export const getWsUrl = () => {
    const prodUrl = 'wss://my-server-url.oa.r.appspot.com/'
    const devUrl = 'ws://localhost:8080'
    return isProduction() ? prodUrl : devUrl
}