import React from "react";
import { Grid } from "@material-ui/core";
import { NyTimesStyles } from "./nyTimesHomeStyle";
import ArticleComments from "./articleComments";
import { useParams } from "react-router-dom";
import NewsCard from "./newsCard";

const NyTimesArticles = () => {
  const classes = NyTimesStyles("articles")();
  let { articleHash } = useParams();
  console.log("articleHash", articleHash);
  let article = null;
  if (articleHash) {
    let storiesObj = JSON.parse(localStorage.getItem("STORIES_OBJ"));
    article = storiesObj[articleHash];
  }
  console.log("article", article);

  //   useEffect(() => {
  //     dispatch(getNyHomeDetails());
  //   }, []);

  //   let { nyHomeResources } = useSelector((state) => state.nyTimesReducer);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={4}>
          {article && (
            <Grid key={article.updated_date} item xs={12}>
              <NewsCard
                classes={classes}
                article={article}
                isArticlePage={true}
              />
            </Grid>
          )}
          <ArticleComments />
        </Grid>
      </Grid>
    </div>
  );
};

export default NyTimesArticles;
