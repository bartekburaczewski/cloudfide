export class BaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ExternalServerError extends Error {}
export class ValidationError extends Error {}
export class BadRequestError extends Error {}
