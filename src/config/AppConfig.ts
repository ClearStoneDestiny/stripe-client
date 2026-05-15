import { env } from "@config/env";

const runtimeBackendDomain =
  typeof window !== "undefined"
    ? window.__APP_CONFIG__?.backendDomain
    : undefined;

const configuredBackendDomain = runtimeBackendDomain ?? env.backendDomain;

const canonicalizeBackendDomain = (value: string) => {
  try {
    const parsed = new URL(value);
    const normalizedPath = parsed.pathname.replace(/\/+$/, "");
    const pathWithoutApi = normalizedPath.replace(/\/api$/i, "");
    return `${parsed.origin}${pathWithoutApi}`;
  } catch {
    return value.replace(/\/+$/, "").replace(/\/api$/i, "");
  }
};

const normalizeBackendDomain = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  return canonicalizeBackendDomain(withProtocol);
};

export class AppConfig {
  static readonly BACKEND_DOMAIN = normalizeBackendDomain(
    configuredBackendDomain,
  );

  static validate() {
    if (!this.BACKEND_DOMAIN) {
      throw new Error(
        "Backend domain is not defined. Set VITE_BACKEND_DOMAIN in Frontend/.env for local dev or provide window.__APP_CONFIG__.backendDomain in runtime-config.js.",
      );
    }

    try {
      const parsed = new URL(this.BACKEND_DOMAIN);
      if (!/^https?:$/i.test(parsed.protocol)) {
        throw new Error("protocol");
      }
    } catch {
      throw new Error(
        `VITE_BACKEND_DOMAIN is invalid: ${this.BACKEND_DOMAIN}. Expected an absolute http(s) URL.`,
      );
    }
  }
}
