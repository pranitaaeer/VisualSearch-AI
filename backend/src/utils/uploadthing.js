import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const uploadToUploadThing = async (file) => {
  try {
    if (!file?.buffer) {
      throw new Error("Image buffer is missing");
    }

    const uint8Array = new Uint8Array(file.buffer);

    const uploadFile = new File(
      [uint8Array],
      file.originalname,
      {
        type: file.mimetype,
      }
    );

    const result = await utapi.uploadFiles(uploadFile);

    console.log("UploadThing response:", result);

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    console.error("UploadThing upload error:", error);

    throw new Error(
      "Failed to upload image to UploadThing"
    );
  }
};