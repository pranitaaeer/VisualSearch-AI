import modal


app = modal.App("visual-search-ml")


# Build the Python environment for the ML service
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "fastapi",
        "uvicorn",
        "python-multipart",
        "python-dotenv",
        "pillow",
        "numpy",
        "qdrant-client",
        "ImageHash",
        "torch",
        "torchvision",
        "transformers",
    )
    .add_local_dir(
        ".",
        remote_path="/root/ml-service",
        copy=True,
    )
)


@app.function(
    image=image,
    memory=2048,
    timeout=600,
    secrets=[modal.Secret.from_name("qdrant-secret")],
)
@modal.asgi_app()
def fastapi_app():
    import sys

    sys.path.insert(0, "/root/ml-service")

    from main import app as fastapi_application

    return fastapi_application