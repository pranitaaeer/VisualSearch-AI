import os
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from dotenv import load_dotenv

load_dotenv()

COLLECTION_NAME = "visual_search_images"
VECTOR_SIZE = 512


client = QdrantClient(
    url=os.environ["QDRANT_URL"],
    api_key=os.environ["QDRANT_API_KEY"],
)


def create_collection():
    collections = client.get_collections().collections

    exists = any(
        collection.name == COLLECTION_NAME
        for collection in collections
    )

    if not exists:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=VECTOR_SIZE,
                distance=Distance.COSINE,
            ),
        )

        print("Qdrant collection created")
    else:
        print("Qdrant collection already exists")


def store_embedding(
    image_id: str,
    embedding: list[float],
    image_url: str,
    image_hash: str,

):
    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[
            PointStruct(
                id=image_id,
                vector=embedding,
                payload={
                    "image_id": image_id,
                    "image_url": image_url,
                    "image_hash": image_hash,
                },
            )
        ],
    )


def search_similar_images(
    embedding: list[float],
    limit: int = 5,
):
    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=embedding,
        limit=limit,
        with_payload=True,
    ).points

    return [
        {
            "image_id": result.payload.get("image_id"),
            "image_url": result.payload.get("image_url"),
            "score": round(result.score, 4),
        }
        for result in results
    ]


def get_all_images():
    results, _ = client.scroll(
        collection_name=COLLECTION_NAME,
        limit=100,
        with_payload=True,
        with_vectors=False,
    )

    return [
        {
            "image_id": point.payload.get("image_id"),
            "image_url": point.payload.get("image_url"),
            "image_hash": point.payload.get("image_hash"),
        }
        for point in results
    ]    