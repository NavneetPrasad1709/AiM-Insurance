import { createClient, type SanityClient } from "@sanity/client";
import { sanityConfig } from "./config";

export function isSanityConfigured(): boolean {
  return Boolean(sanityConfig.projectId);
}

let _client: SanityClient | null = null;
let _previewClient: SanityClient | null = null;

function buildClient(preview = false): SanityClient {
  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: preview ? false : sanityConfig.useCdn,
    perspective: preview ? "drafts" : "published",
    token: preview ? process.env.SANITY_API_READ_TOKEN : undefined,
  });
}

/**
 * Real Sanity client. Throws at construction time if projectId is empty,
 * so we lazy-init and gate every call site behind `isSanityConfigured()`.
 *
 * Internally this is exposed as a Proxy so legacy callers using the named
 * `sanityClient` import continue to work — but accessing it without a
 * configured projectId will throw, exactly as expected.
 */
export const sanityClient: SanityClient = new Proxy({} as SanityClient, {
  get(_target, prop, receiver) {
    if (!_client) {
      if (!isSanityConfigured()) {
        throw new Error(
          "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID before calling sanityClient.",
        );
      }
      _client = buildClient(false);
    }
    return Reflect.get(_client, prop, receiver);
  },
});

export const previewClient: SanityClient = new Proxy({} as SanityClient, {
  get(_target, prop, receiver) {
    if (!_previewClient) {
      if (!isSanityConfigured()) {
        throw new Error(
          "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID before calling previewClient.",
        );
      }
      _previewClient = buildClient(true);
    }
    return Reflect.get(_previewClient, prop, receiver);
  },
});

export function getClient(preview = false): SanityClient {
  return preview ? previewClient : sanityClient;
}
