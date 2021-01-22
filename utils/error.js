
class APIError extends Error {
  constructor(message = "Internal Server Error", code = 500, ...params) {
    super(...params)
    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError)
    }

    this.message = message
    this.status = code
    this.timestamp = new Date().getTime()
  }
}

module.exports = APIError