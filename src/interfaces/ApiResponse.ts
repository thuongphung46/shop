import { API_MESSAGE_CODE } from "./enums/ApiMessageCode";

export type ApiResponse<T> = {
  msg_code?: API_MESSAGE_CODE;
  content?: T;
  message?: string;
};
