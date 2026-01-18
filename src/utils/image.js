// src/utils/image.js
import api from "./api";

const DEFAULT_PLACEHOLDER = "https://via.placeholder.com/600x400?text=No+Image";

export default function buildImageUrl(image) {
  if (!image) return DEFAULT_PLACEHOLDER;

  // Leave absolute URLs and data URIs as-is
  if (/^(https?:)?\/\//i.test(image) || /^data:/i.test(image)) return image;

  // Derive backend origin from axios baseURL (fall back to http://localhost:8080)
  const base = (api && api.defaults && api.defaults.baseURL) || "http://localhost:8080/api";
  const origin = base.replace(/\/api\/?$/, "");

  // Ensure leading slash
  const path = image.startsWith("/") ? image : `/${image}`;
  return `${origin}${path}`;
}
