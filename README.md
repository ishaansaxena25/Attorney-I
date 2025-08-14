# Legal News API Documentation

## Overview

This API fetches and stores legal news from India using the GNews API. It includes automatic tagging of articles and scheduled updates.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`:

```plaintext
GNEWS_API_KEY=your_api_key_here
MONGODB_URI=mongodb://localhost:27017/attorney-i
```

## Database Schema

### LegalNews Collection

- `articleId`: Unique identifier (String)
- `title`: Article title (String)
- `description`: Article description (String)
- `url`: Article URL (String)
- `image`: Image URL (String)
- `publishedAt`: Publication date (Date)
- `source`: News source information (Object)
  - `id`: Source ID (String)
  - `name`: Source name (String)
  - `url`: Source URL (String)
- `tags`: Array of legal categories (Array[String])
- `fetchedAt`: Timestamp of when article was stored (Date, TTL: 7 days)

## API Endpoints

### 1. Get Latest News

Retrieves the 10 most recent legal news articles.

```http
GET /api/news
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "articles": [
      {
        "articleId": "35cf47baa706464bcc777d89e6de9c51",
        "title": "Sample Legal News",
        "description": "Description text...",
        "tags": ["Corporate", "International"],
        "publishedAt": "2025-08-14T12:11:29Z",
        "source": {
          "name": "Source Name",
          "url": "https://source.com"
        }
      }
    ],
    "count": 10
  }
}
```

### 2. Get News by Tag

Retrieves the 10 most recent articles with a specific tag.

```http
GET /api/news?tag=Corporate
```

Available tags:

- Corporate
- Criminal
- International
- Privacy

## Automated Tasks

### News Fetching Schedule

- **Frequency**: Every 30 minutes
- **Process**:
  1. Fetches latest legal news from GNews API
  2. Processes articles for legal category tags
  3. Stores new articles (checks for duplicates using articleId)
  4. Automatically removes articles older than 7 days

### Tag Processing

Articles are automatically tagged based on keywords in their title and description:

- **Corporate**: corporate, company, business, merger, etc.
- **Criminal**: criminal, crime, fraud, homicide, etc.
- **International**: international, treaty, bilateral, etc.
- **Privacy**: privacy, data protection, HIPAA, etc.

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `500`: Server error

Error Response Format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

## Usage Examples

1. Get latest legal news:

```bash
curl http://localhost:3000/api/news
```

2. Get corporate law news:

```bash
curl http://localhost:3000/api/news?tag=Corporate
```

## Notes

- Articles are automatically deleted after 7 days
- The system maintains unique articles using GNews article IDs
- News is automatically fetched every 30 minutes
- All timestamps are in UTC

## Project Structure

```
src/
├── controllers/
│   └── newsController.js
├── models/
│   └── LegalNews.js
├── routes/
│   └── news.js
├── scheduler/
│   └── newsScheduler.js
├── utils/
│   └── tagProcessor.js
└── index.js
```
