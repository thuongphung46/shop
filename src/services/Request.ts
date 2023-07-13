import axios, { HttpStatusCode } from "axios";

import GlobalConstant, { API_URL } from "constants/GlobalConstant";
import { ApiResponse } from "interfaces/ApiResponse";

export const upgradeApiInstance = axios.create({
  baseURL: API_URL.UPGRADE_DB,
  timeout: GlobalConstant.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbmlzdHJhdG9yQGlyc3ZpZXRuYW0uY29tIiwiUFlYSVMiLCIwMi8xMy8yMDIzIDA0OjQzOjA5IiwiMjAyMzAzMTMiXSwibmJmIjoxNjc2MjYzMzg5LCJleHAiOjE2Nzg2ODI1ODksImlhdCI6MTY3NjI2MzM4OX0.H8fldq4AknYQD5HUGWIjae1R_euC537mlrh9UCFreuE"
  },
});

// export const uploadCloudInstance = axios.create({
//   baseURL: API_URL.UPLOAD,
//   timeout: GlobalConstant.REQUEST_TIMEOUT,
//   headers: {
//     Accept: "application/json, text/plain, */*",
//     Authorization: "",
//   },
// });

const composeUri = (controller: string, action: string, obj: any) => {
  const arr = [];
  let controllerName = "";
  if (controller !== "") {
    controllerName = "/" + controller;
  }
  if (obj === null || obj === undefined) {
    return controllerName + "/" + action;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      arr.push(key + "=" + encodeURIComponent(obj[key]));
    }
  }
  return controllerName + "/" + action + "?" + arr.join("&");
};

export const HttpClientRequest = (controller: string) => {
  return {
    getAsync: async (
      action: string,
      params?: any
    ): Promise<ApiResponse<any>> => {
      const uri = composeUri(controller, action, params);
      return await upgradeApiInstance
        .get(uri, params)
        .then((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return response.data as ApiResponse<any>;
          }
        })
        .catch((error) => {
          if (error.response) {
            return error.response;
          }
          throw error;
        });
    },

    postAsync: async (
      action: string,
      params?: any
    ): Promise<ApiResponse<any>> => {
      const uri = composeUri(controller, action, params);

      return await upgradeApiInstance
        .post(uri, params, {
          headers: {},
        })
        .then((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return response.data;
          }
        })
        .catch((error) => {
          if (error.response) {
            return error.response;
          }
          throw error;
        });
    },
  };
};
