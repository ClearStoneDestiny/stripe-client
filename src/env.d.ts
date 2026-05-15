interface ImportMetaEnv {
  readonly VITE_BACKEND_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface AppRuntimeConfig {
  apiBasePath?: string;
  backendDomain?: string;
}

interface Window {
  __APP_CONFIG__?: AppRuntimeConfig;
}
