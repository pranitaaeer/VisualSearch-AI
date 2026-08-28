# introduction

Radhe Radhe,
I’m **Pranita Aeer**, a **MERN Stack Developer** passionate about building full-stack applications and exploring emerging technologies.

I built this project to explore and gain a deeper understanding of **AI/ML concepts**, particularly **computer vision, image embeddings, vector databases, and visual similarity search**.

Through this project, I aimed to understand how AI/ML can be integrated with modern full-stack technologies to build practical, real-world applications.

# 🔍 AI Visual Search

An AI-powered visual search application that allows users to upload an image and discover visually similar images from a personal image database as well as the web.

The application combines **Computer Vision, Image Embeddings, Vector Search, and Google Lens** to provide a reverse-image-search style experience.

---

## ✨ Features

* 🖼️ Upload an image and search visually similar images
* 🤖 AI-powered image embeddings using **CLIP**
* 🔎 Semantic similarity search using **Qdrant Vector Database**
* ☁️ Image storage using **UploadThing**
* 🌐 Web-based visual search using **Google Lens via SerpApi**
* 📊 Similarity score for database results
* 🔗 Source links for web results
* ⚡ Fast API communication between Next.js, Express, and Python
* 🛡️ Environment-based API configuration
* 📱 Responsive interface for desktop and mobile

---

## 🏗️ Architecture

```text
                    ┌──────────────────┐
                    │   Next.js UI     │
                    │    Frontend      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express / Node   │
                    │     Backend      │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
      ┌──────────────┐              ┌────────────────┐
      │ Python ML    │              │   Google Lens  │
      │   Service    │              │    SerpApi     │
      └──────┬───────┘              └───────┬────────┘
             │                              │
             ▼                              ▼
      ┌──────────────┐              ┌────────────────┐
      │    CLIP      │              │   Web Results  │
      │  Embeddings  │              │                │
      └──────┬───────┘              └────────────────┘
             │
             ▼
      ┌──────────────┐
      │    Qdrant    │
      │ Vector DB    │
      └──────────────┘

             +
      ┌──────────────┐
      │  UploadThing │
      │ Image Storage│
      └──────────────┘
```

---

## 🔄 How It Works

### 1. Image Upload

The user uploads an image through the Next.js frontend.

```text
User
 ↓
Next.js
 ↓
Express + Multer
```

Multer receives the image as a buffer.

---

### 2. Image Storage

The uploaded image can be stored using UploadThing.

```text
Image Buffer
     ↓
UploadThing
     ↓
Public Image URL
```

The generated image URL is stored as metadata along with the vector in Qdrant.

---

### 3. Image Embedding

The Express backend sends the image to the Python ML service.

The Python service uses **CLIP** to convert the image into a numerical vector representation.

```text
Image
  ↓
CLIP Model
  ↓
Image Embedding
  ↓
512-dimensional Vector
```

---

### 4. Vector Search

The generated embedding is searched against vectors stored in Qdrant.

Qdrant uses **Cosine Similarity** to determine which images are visually similar.

```text
Query Image
     ↓
Embedding
     ↓
Qdrant
     ↓
Similarity Search
     ↓
Top Matching Images
```

---

### 5. Web Visual Search

The uploaded image is also made available through its public UploadThing URL.

That URL is sent to **Google Lens through SerpApi**.

```text
Uploaded Image
      ↓
Public Image URL
      ↓
Google Lens
      ↓
SerpApi
      ↓
Visual Matches / Web Results
```

The application combines:

* Images from the application's own Qdrant database
* Visual matches discovered on the web

---

## 🧠 AI / ML Concepts Used

### CLIP

CLIP is used to generate meaningful vector representations of images.

Instead of comparing raw pixels, the application compares image embeddings.

```text
Image A → Vector A
Image B → Vector B

Vector A ↔ Vector B
       ↓
Cosine Similarity
```

A higher similarity score means the images are more visually similar.

---

## 🗄️ Vector Database

The project uses **Qdrant** as the vector database.

Each indexed image contains:

```json
{
  "image_id": "unique-id",
  "image_url": "public-image-url",
  "embedding": "512-dimensional-vector"
}
```

Qdrant performs nearest-neighbor similarity search using cosine distance.

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* JavaScript (ES Modules)
* Multer
* Axios

### AI / Machine Learning

* Python
* FastAPI
* PyTorch
* Hugging Face Transformers
* CLIP
* Image embeddings

### Vector Search

* Qdrant

### Image Storage

* UploadThing

### Web Search

* Google Lens
* SerpApi

---

## 📁 Project Structure

```text
AI-Visual-Search/
│
├── backend/
├── ├──src/
│   │    ├── config/
│   │    ├── controllers/
│   │    ├── middleware/
│   │    ├── routes/
│   │    ├── utils/
│   │    │    ├── uploadthing.js
│   │    │    └── serpapi.js
│   │    └── server.js
│   └──package.json
├── ml-service/
│   ├──services
│   │   ├── image_embedding.py
│   │   ├──image_classifier.py 
│   │   ├──image_hash.py
│   │   ├──similarity.py
│   │   ├──vector_store.py  
│   └── main.py    
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    └── package.json
```

---

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the backend directory:

```env
PORT=5000

ML_SERVICE_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:3000
UPLOADTHING_TOKEN=your_uploadthing_token

SERPAPI_KEY=your_serpapi_key
```

### ML Service

```env
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key
```

### Frontend

Create `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> Never commit `.env` or `.env.local` files to GitHub.

---

## 🚀 Installation

### Clone the repository

```bash
git clone `https://github.com/pranitaaeer/VisualSearch-AI.git`
cd AI-Visual-Search
```

---

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### Python ML Service

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Run the service:

```bash
uvicorn main:app --reload --port 8000
```

ML service:

```text
http://localhost:8000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## 🔌 API Endpoints

### Index Image

```http
POST /api/images/index
```

Indexes an image into the vector database.

---

### Search Images

```http
POST /api/images/search
```

Searches for visually similar images.

The endpoint can return:

```json
{
  "success": true,
  "database_results": [],
  "web_results": []
}
```

---

## 🔐 Security

API keys and sensitive configuration are stored using environment variables.

The following should never be committed:

```text
.env
.env.local
API keys
Qdrant credentials
UploadThing credentials
SerpApi credentials
```

---

## 📌 Future Improvements

* User authentication
* Search history
* Image collections
* Advanced result ranking
* Pagination for web results
* Image caching
* Search quota indicator
* Automatic cleanup of temporary uploaded images
* More advanced image similarity models
* Production monitoring and analytics

---

## 🎯 Project Goal

The goal of this project is to build a **reverse-image-search style application** that combines traditional web image discovery with AI-powered semantic image similarity.

It demonstrates practical implementation of:

* Computer Vision
* Image Embeddings
* Vector Databases
* Semantic Search
* AI APIs
* Full-Stack Development
* Python + Node.js integration
* Cloud-based services

---

## 👩‍💻 Author

**Pranita Aeer**

Built with ❤️ using **Next.js, Node.js, Python, CLIP, Qdrant, UploadThing, and Google Lens.**
