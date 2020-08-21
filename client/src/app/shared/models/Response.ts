
export interface ResponseModel {
  status: Status;
  token?: string;
  data: any;
  message?: string;
}

export enum Status {
  ERROR = 'error',
  SUCCESS = 'success',
  FAIL = 'fail'
}
