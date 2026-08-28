from PIL import Image
import imagehash


def generate_image_hash(image: Image.Image) -> str:
    return str(imagehash.phash(image))


def calculate_hash_distance(
    hash1: str,
    hash2: str
) -> int:
    return imagehash.hex_to_hash(hash1) - imagehash.hex_to_hash(hash2)


def is_near_duplicate(
    hash1: str,
    hash2: str,
    threshold: int = 8
) -> bool:
    distance = calculate_hash_distance(hash1, hash2)

    return distance <= threshold