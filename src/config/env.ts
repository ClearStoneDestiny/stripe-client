import * as v from "valibot";

const envSchema = v.object({
  VITE_BACKEND_DOMAIN: v.optional(v.string()),
});

const parsedEnv = v.safeParse(envSchema, {
  VITE_BACKEND_DOMAIN: import.meta.env.VITE_BACKEND_DOMAIN,
});

if (!parsedEnv.success) {
  const issues = parsedEnv.issues
    .map((issue) => `- ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid environment variables:\n${issues}`);
}

const rawBackendDomain = parsedEnv.output.VITE_BACKEND_DOMAIN;
const backendDomain = rawBackendDomain?.trim();

if (rawBackendDomain !== undefined && !backendDomain) {
  throw new Error(
    "Invalid environment variables:\n- VITE_BACKEND_DOMAIN is set but empty.",
  );
}

if (backendDomain) {
  try {
    const parsed = new URL(backendDomain);

    if (!/^https?:$/i.test(parsed.protocol)) {
      throw new Error();
    }
  } catch {
    throw new Error(
      `Invalid environment variables:\n- VITE_BACKEND_DOMAIN must be an absolute http(s) URL. Received: ${backendDomain}`,
    );
  }
}

export const env = {
  backendDomain,
  isDev: import.meta.env.DEV,
} as const;
