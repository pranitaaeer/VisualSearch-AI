import torch

from PIL import Image
from transformers import CLIPProcessor, CLIPModel


MODEL_NAME = "openai/clip-vit-base-patch32"

processor = None
model = None


def load_model():
    global processor, model

    if model is None:
        print("Loading CLIP model...")

        processor = CLIPProcessor.from_pretrained(
            MODEL_NAME
        )

        model = CLIPModel.from_pretrained(
            MODEL_NAME,
            torch_dtype=torch.float32
        )

        # CPU inference
        model = model.to("cpu")
        model.eval()

        print("CLIP model loaded successfully")


def generate_image_embedding(
    image: Image.Image
):
    load_model()

    image = image.convert("RGB")

    inputs = processor(
        images=image,
        return_tensors="pt"
    )

    # CPU inference without gradient tracking
    with torch.inference_mode():

        outputs = model.vision_model(
            pixel_values=inputs["pixel_values"]
        )

        pooled_output = outputs.pooler_output

        image_features = model.visual_projection(
            pooled_output
        )

    # Normalize embedding
    image_features = image_features / image_features.norm(
        dim=-1,
        keepdim=True
    )

    return image_features[0].tolist()