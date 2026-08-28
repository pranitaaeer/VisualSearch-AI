import torch


def cosine_similarity(
    embedding1: list[float],
    embedding2: list[float]
) -> float:

    vector1 = torch.tensor(embedding1)
    vector2 = torch.tensor(embedding2)

    similarity = torch.nn.functional.cosine_similarity(
        vector1.unsqueeze(0),
        vector2.unsqueeze(0)
    )

    return round(similarity.item(), 4)