const DEFAULT_DIRECTUS_URL = "http://localhost:8055";

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : undefined;
}
export const DIRECTUS_URL: string =
  readEnv("DIRECTUS_URL") ??
  readEnv("NEXT_PUBLIC_DIRECTUS_URL") ??
  DEFAULT_DIRECTUS_URL;
