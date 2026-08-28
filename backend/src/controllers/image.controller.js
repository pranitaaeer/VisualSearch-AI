import axios from "axios";
import FormData from "form-data";

export const searchSimilarImages = async (req, res) => {
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

    formData.append("limit", "5");

    const response = await axios.post(
      `${process.env.ML_SERVICE_URL}/search`,
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
      "Visual search error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to search similar images",
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

    // image URL for testing
    // TODO:Cloudinary/S3 URL 
    
    formData.append(
      "image_url",
      req.body.image_url || req.file.originalname
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