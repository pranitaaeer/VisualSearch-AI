import axios from "axios";

export const searchWithGoogleLens = async (imageUrl) => {
  try {
    if (!imageUrl) {
      throw new Error("Image URL is required");
    }

    const response = await axios.get(
      "https://serpapi.com/search",
      {
        params: {
          engine: "google_lens",
          url: imageUrl,
          api_key: process.env.SERPAPI_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Google Lens search error:",
      error.response?.data || error.message
    );

    // SerpApi quota/rate limit
    if (error.response?.status === 429) {
      throw new Error("SEARCH_LIMIT_REACHED");
    }

    // SerpApi can also return quota-related errors
    const errorMessage =
      error.response?.data?.error || "";

    if (
      errorMessage.toLowerCase().includes("limit") ||
      errorMessage.toLowerCase().includes("quota")
    ) {
      throw new Error("SEARCH_LIMIT_REACHED");
    }

    throw new Error("WEB_SEARCH_FAILED");
  }
};