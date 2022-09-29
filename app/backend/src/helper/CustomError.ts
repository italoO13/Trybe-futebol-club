interface CustomError{
  code:number
}

class CustomError extends Error {
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export default CustomError;