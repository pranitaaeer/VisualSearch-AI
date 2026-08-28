from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from PIL import Image
from io import BytesIO

from services.image_classifier import classify_image
from services.image_embedding import generate_image_embedding
from services.similarity import cosine_similarity
from services.vector_store import (create_collection,store_embedding,search_similar_images,get_all_images,)
from services.image_hash import  (generate_image_hash, is_near_duplicate,)
app = FastAPI(title="VisualSearch AI ML Service")


@app.get("/health")
def health():
    return {
        "success": True,
        "message": "ML service is running"
    }


@app.post("/classify")
async def classify(file: UploadFile = File(...)):

    # Check image type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image"
        )

    try:
        # Read uploaded image
        image_bytes = await file.read()

        # Convert bytes → PIL Image
        image = Image.open(BytesIO(image_bytes))

        # Classify image
        predictions = classify_image(image)

        return {
            "success": True,
            "predictions": predictions
        }

    except Exception as error:
        print("Classification error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to classify image"
        )


@app.post("/embedding")
async def embedding(file: UploadFile = File(...)):

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image"
        )

    try:
        image_bytes = await file.read()

        image = Image.open(
            BytesIO(image_bytes)
        )

        vector = generate_image_embedding(image)
        return {
            "success": True,
            "dimensions": len(vector),
            "embedding": vector
        }

    except Exception as error:
        print("Embedding error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to generate image embedding"
        )


@app.post("/similarity")
async def compare_images(
    file1: UploadFile = File(...),
    file2: UploadFile = File(...)
):
    if (
        not file1.content_type
        or not file1.content_type.startswith("image/")
        or not file2.content_type
        or not file2.content_type.startswith("image/")
    ):
        raise HTTPException(
            status_code=400,
            detail="Both files must be valid images"
        )

    try:
        image1_bytes = await file1.read()
        image2_bytes = await file2.read()

        image1 = Image.open(BytesIO(image1_bytes))
        image2 = Image.open(BytesIO(image2_bytes))

        embedding1 = generate_image_embedding(image1)
        embedding2 = generate_image_embedding(image2)

        score = cosine_similarity(
            embedding1,
            embedding2
        )

        return {
            "success": True,
            "similarity": score,
            "similarity_percentage": round(score * 100, 2)
        }

    except Exception as error:
        print("Similarity error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to compare images"
        )   

@app.on_event("startup")
def startup():
    create_collection() 

@app.post("/index")
async def index_image(
    file: UploadFile = File(...),
    image_url: str = Form(...)
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image"
        )

    try:
        image_bytes = await file.read()

        image = Image.open(
            BytesIO(image_bytes)
        )

        embedding = generate_image_embedding(image)
        image_hash = generate_image_hash(image)

        import uuid

        image_id = str(uuid.uuid4())

        store_embedding(
            image_id=image_id,
            embedding=embedding,
            image_url=image_url,
            image_hash=image_hash,
        )

        return {
            "success": True,
            "message": "Image indexed successfully",
            "image_id": image_id,
            "image_url": image_url,
            "image_hash": image_hash
        }

    except Exception as error:
        print("Indexing error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to index image"
        )    


@app.post("/search")
async def search_images(
    file: UploadFile = File(...),
    limit: int = Form(5),
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image"
        )

    try:
        image_bytes = await file.read()

        image = Image.open(
            BytesIO(image_bytes)
        )

        # Generate CLIP embedding
        embedding = generate_image_embedding(image)

        # Generate perceptual hash
        image_hash = generate_image_hash(image)

        # Search similar images in Qdrant
        results = search_similar_images(
            embedding=embedding,
            limit=limit
        )

        # Get stored images and their hashes
        all_images = get_all_images()

        exact_match = None
        near_duplicate = None

        # Check exact / near duplicate
        for stored_image in all_images:

            stored_hash = stored_image.get("image_hash")

            if not stored_hash:
                continue

            # Exact match
            if is_near_duplicate(
                image_hash,
                stored_hash,
                threshold=0
            ):
                exact_match = stored_image
                break

            # Near duplicate
            if is_near_duplicate(
                image_hash,
                stored_hash,
                threshold=8
            ):
                near_duplicate = stored_image

        # Similarity threshold
        MIN_SIMILARITY = 0.70

        results = [
            result
            for result in results
            if result["score"] >= MIN_SIMILARITY
        ]

        return {
            "success": True,
            "exact_match": exact_match,
            "near_duplicate": near_duplicate,
            "results": results,
            "count": len(results),
        }

    except Exception as error:
        print("Search error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to search similar images"
        )          