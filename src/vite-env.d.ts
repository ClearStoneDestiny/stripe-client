/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  __APP_CONFIG__?: {
    backendDomain?: string;
  };
}
