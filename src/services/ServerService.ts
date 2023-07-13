import { HttpClientRequest } from "./Request";

const controller = "Database";

export const ServerService = {
  Servers: async () => {
    return await HttpClientRequest(controller).getAsync("GetListDbByServer");
  },
  ServerInfo: async (serverName?: string) => {
    return await HttpClientRequest(controller).getAsync("GetListDbByServer", {
      ServerName: serverName,
    });
  },
  GetListDbByVersion: async (Version: string) => {
    return await HttpClientRequest(controller).getAsync("GetListDbByVersion", {
      Version
    });
  }
};
