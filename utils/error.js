
class APIError extends Error {
  constructor(message = "Internal Server Error", status = 500, ...params) {
    super(...params)
    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError)
    }

    this.message = message
    this.status = status
    this.timestamp = new Date().getTime()
  }
}

module.exports = APIError