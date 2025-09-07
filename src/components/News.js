import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use your Vercel environment variable
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [url]);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!articles || articles.length === 0) return <p>No articles available</p>;

  return (
    <div className="news-container">
      {articles.map((article, index) => (
        <NewsItem key={index} {...article} />
      ))}
    </div>
  );
};

export default News;
