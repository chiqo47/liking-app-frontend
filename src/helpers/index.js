export function checkFetchStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return Promise.reject(response.status)
  }
}
