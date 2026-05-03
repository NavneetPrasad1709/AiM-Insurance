import { createImageUrlBuilder } from "@sanity/image-url";
import type {
  ImageUrlBuilder,
  SanityImageSource,
} from "@sanity/image-url";
import { isSanityConfigured } from "./client";
import { sanityConfig } from "./config";
import type { SanityImage } from "@/types";

let _builder: ReturnType<typeof createImageUrlBuilder> | null = null;

function getBuilder(): ReturnType<typeof createImageUrlBuilder> {
  if (_builder) return _builder;
  if (!isSanityConfigured()) {
    throw new Error(
      "Sanity is not configured — call urlFor() only when isSanityConfigured() is true.",
    );
  }
  _builder = createImageUrlBuilder({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
  });
  return _builder;
}

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return getBuilder().image(source);
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export function getImageDimensions(image: SanityImage | undefined): ImageDimensions {
  const ref = image?.asset?._ref;
  if (!ref) return { width: 1200, height: 800 };

  const parts = ref.split("-");
  const dims = parts[2];
  if (!dims) return { width: 1200, height: 800 };

  const [w, h] = dims.split("x").map(Number);
  if (!w || !h) return { width: 1200, height: 800 };

  return { width: w, height: h };
}
