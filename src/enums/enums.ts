export enum HttpCodes {
  SERVER_ERROR = 500,
  NOT_FOUND = 404,
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

export enum StatusMsg {
  SERVER_ERROR_MSG = 'Server error',
  NOT_FOUND_MSG = 'Not Found',
  NO_CONTENT_MSG = 'User has been successful deleted',
  INVALID_CREDENTIALS_MSG = 'Invalid Credentials',
  NO_AUTHORIZATION_HEADER_MSG = 'You must send an Authorization header',
  NO_BEARER_TOKEN_TYPE_MSG = 'Expected a Bearer token',
  UNAUTHORIZED_MSG = 'Unauthorized',
}

export enum RequiredError {
  PARAM_PEQUIRED = 'ID param is required',
}

export enum ExpirationPeriod {
  EXPIRATION_PERIOD = 60 * 60 * 24,
}

export enum Admin {
  ADMIN = 'admin',
}

export enum Bearer {
  BEARER = 'Bearer',
}
