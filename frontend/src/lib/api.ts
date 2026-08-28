export interface SearchResult {
  image_id: string;
  image_url: string;
  score: number;
}

export interface WebResult {
  title?: string;
  link?: string;
  thumbnail?: string;
  source?: string;
}

export interface SearchResponse {
  success: boolean;
  database_results: SearchResult[];
  web_results: WebResult[];
}

export const searchImages = async (
  file: File
): Promise<SearchResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/images/search`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search images");
  }

  return response.json();
};