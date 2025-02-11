import '../App.css'

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const generateSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

export default function Article({ articles }) {
  const { urlId } = useParams();
  const navigate = useNavigate();

  // Find the article by slug instead of ID
  const article = articles.find((a) => generateSlug(a.title) === urlId);

  useEffect(() => {
    if (!article) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [article, navigate]);

  return (
    <div>
      {!article && <p>No records found! Redirecting...</p>}
      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          {/* to render html tags like <strong> and <br> */}
          <p dangerouslySetInnerHTML={{ __html: article.body }}></p>
        </div>
      )}
    </div>
  );
}
