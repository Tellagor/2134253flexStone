import { createDirectus, rest } from "@directus/sdk";

import { DIRECTUS_URL } from "@/shared/config";

export const directus = createDirectus(DIRECTUS_URL).with(rest());
