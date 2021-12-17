import React from "react";
import { Grid } from "@mui/material";
import ArticleComments from "./articleComments";
import { useParams } from "react-router-dom";
import NewsCard from "./newsCard";
import "./nyTimes.scss";

const NyTimesArticles = () => {
  let { articleHash } = useParams();
  console.log("articleHash", articleHash);
  let article = null;
  if (articleHash) {
    let storiesObj = JSON.parse(localStorage.getItem("STORIES_OBJ"));
    article = storiesObj[articleHash];
  }
  console.log("article", article);

  return (
    <div className="NyTimes">
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={4}>
          {article && (
            <Grid key={article.updated_date} item xs={12}>
              <NewsCard article={article} isArticlePage={true} />
            </Grid>
          )}
          <ArticleComments />
        </Grid>
      </Grid>
    </div>
  );
};

export default NyTimesArticles;
