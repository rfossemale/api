export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    description: string,
    isOperational: boolean,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    console.log('Base error filter', 'status code: ', this.httpCode);
    // console.log('Global filter', this.httpCode); -> status code comes from catch in the  /error endpoint
    Error.captureStackTrace(this);
    // function MiError(message) {
    //   this.message = message;
    //   Error.captureStackTrace(this, MiError);
    // }
    // // Crear una instancia de MiError
    // var error = new MiError('Este es un mensaje de error personalizado');
    // // El objeto error ahora tiene un rastro de la pila personalizado
    // console.log(error.stack);
  }
}

//free to extend the BaseError
export class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = 'internal server error',
  ) {
    super(name, httpCode, description, isOperational);
  }
}

export class BadRequestError extends BaseError {
  constructor(name, isOperational = false, description = 'Bad Request') {
    super(name, HttpStatusCode.BAD_REQUEST, description, isOperational);
  }
}

export class NotFoundError extends BaseError {
  constructor(name, isOperational = false, description = 'Not Found') {
    super(name, HttpStatusCode.NOT_FOUND, description, isOperational);
  }
}
