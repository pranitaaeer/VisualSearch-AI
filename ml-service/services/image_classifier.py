import torch
from torchvision import models, transforms
from PIL import Image


# Load pretrained model once when service starts
weights = models.ResNet50_Weights.DEFAULT
model = models.resnet50(weights=weights)
model.eval()

# Preprocessing required by the model
preprocess = weights.transforms()

# ImageNet class names
categories = weights.meta["categories"]


def classify_image(image: Image.Image):
    # Convert image to RGB
    image = image.convert("RGB")

    # Preprocess image
    input_tensor = preprocess(image).unsqueeze(0)

    # Prediction
    with torch.no_grad():
        output = model(input_tensor)

    # Convert output to probabilities
    probabilities = torch.nn.functional.softmax(output[0], dim=0)

    # Get top 5 predictions
    top_probabilities, top_indices = torch.topk(probabilities, 5)

    results = []

    for probability, index in zip(top_probabilities, top_indices):
        results.append({
            "label": categories[index.item()],
            "confidence": round(probability.item() * 100, 2)
        })

    return results