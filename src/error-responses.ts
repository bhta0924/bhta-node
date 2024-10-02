export class ErrorResponse {
  constructor(public type: string = "", public message: string = "") {}

  toJSON() {
    return {
      message: this.message,
      type: this.type,
    };
  }
}

export class BadRequestErrorResponse extends ErrorResponse {
  constructor(message?: string) {
    super("bad_request", message);
  }
}

export class NotFoundErrorResponse extends ErrorResponse {
  constructor(message = "") {
    super("not_found", message);
  }
}

export class InternalServerErrorResponse extends ErrorResponse {
  constructor(message: string = "") {
    super("internal_server_error", message);
  }
}
