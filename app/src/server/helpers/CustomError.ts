export class CustomError extends Error {
  public status: number = 500;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'unauthorized') {
    super(message, 401);
  }
}
