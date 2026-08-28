import axios from "axios";
import FormData from "form-data";
import { uploadToUploadThing } from "../utils/uploadthing.js"
import { searchWithGoogleLens } from "../utils/serpapi.js";

export const searchSimilarImages = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload image temporarily so Google Lens can access it
    const uploadResult = await uploadToUploadThing(
      req.file
    );

    const imageUrl = uploadResult.data.ufsUrl;

    // Search our own Qdrant database
    const formData = new FormData();

    formData.append(
      "file",
      req.file.buffer,
      {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      }
    );

    formData.append("limit", "5");

    const qdrantResponse = await axios.post(
      `${process.env.ML_SERVICE_URL}/search`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    // Search internet using Google Lens
    const lensResponse =
      await searchWithGoogleLens(imageUrl);

    return res.status(200).json({
      success: true,

      database_results:
        qdrantResponse.data.results || [],

      web_results:
        lensResponse.visual_matches || [],

    });

  } catch (error) {
    console.error(
      "Visual search error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Visual search failed",
    });
  }
};

export const indexImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const formData = new FormData();

        formData.append(
            "file",
            req.file.buffer,
            {
                filename: req.file.originalname,
                contentType: req.file.mimetype,
            }
        );
       const uploadResult = await uploadToUploadThing(
  req.file
);

const imageUrl = uploadResult.data.ufsUrl;


        formData.append(
            "image_url",
            imageUrl
        );

        const response = await axios.post(
            `${process.env.ML_SERVICE_URL}/index`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
            }
        );

        return res.status(200).json(response.data);

    } catch (error) {
        console.error(
            "Image indexing error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to index image",
        });
    }
};