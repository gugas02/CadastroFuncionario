export class Response<T> {
  success: boolean;
  message: string | string[];
  data: T;
  status?: number;

  constructor() {
    this.message = [];
  }
}
