import { LOCALE_REGION } from "@interfaces/enums/LocaleRegion";

const GlobalConstant = {
  REQUEST_TIMEOUT: 5000,
  CURRENT_REGION: LOCALE_REGION.VI_VN,
} as const;

const gwUrl = import.meta.env.VITE_GATEWAY_URL;
export const API_URL = {
  UPLOAD: `${gwUrl}/files`,
  UPGRADE_DB: `${gwUrl}/upgrade-db`,
  SSO: `${gwUrl}/auth`,
} as const;

export default GlobalConstant;
