import fetch from 'cross-fetch'

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8443'

function checkIsJson(res: Response) {
  const contentType = res.headers.get('content-type');
  return contentType && contentType.indexOf('application/json') !== -1;
}

export const apiGetRequest = async (url: string, arg: string) => {
  return await fetch(`${baseURL}/api/v1/${url}?${arg}`)
}

export const apiPostRequest = async (url: string, args: object) => {
  const res = await fetch(`${baseURL}/api/v1/${url}`, {
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
  })
  const isJson = checkIsJson(res)
  if (res.ok) {
    if (isJson)
      return await res.json()
    return res.text()
  } else {
    throw Error('api request failed')
  }
  
}
