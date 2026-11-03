export class ApiError extends Error {
  readonly status: number;

  constructor(action: string, status: number) {
    super(`${action} (${status})`);
    this.name = "ApiError";
    this.status = status;
  }
}
