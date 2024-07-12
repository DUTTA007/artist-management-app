class HttpError extends Error {
  code: number;
  message: string;
  constructor(message: string, errorCode: number) {
    super(message);
    this.message = message;
    this.code = errorCode;
  }
}

export { HttpError };
