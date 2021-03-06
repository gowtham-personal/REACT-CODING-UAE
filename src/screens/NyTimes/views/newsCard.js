import React from "react";
import {
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Avatar,
  Grid,
  Card,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { getHashFromUrl } from "../services/nyTimesAction";

const NewsCard = (props) => {
  let history = useHistory();
  let { article, isArticlePage, classes } = props;
  return (
    <Grid key={article.updated_date} item xs={12}>
      <Card
        className={classes.cardRoot}
        onClick={() => {
          if (!isArticlePage) {
            history.push(`/article/${getHashFromUrl(article.short_url)}`);
          }
        }}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {article.section.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={article.section.toUpperCase()}
          subheader={moment(article.updated_date).format("MMM DD YYYY hh:mm A")}
        />

        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            className={classes.title}
            gutterBottom
          >
            {article.title}
          </Typography>
          {isArticlePage && (
            <Typography className={classes.pos} color="textSecondary">
              {article.abstract}
            </Typography>
          )}
        </CardContent>
        {isArticlePage && (
          <CardActions className={classes.cardFooter}>
            <Button
              size="small"
              color="primary"
              href={article.short_url}
              target="_blank"
              className={classes.footerLink}
            >
              Visit Our Site
            </Button>
            <Typography color="textSecondary">{article.byline}</Typography>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

export default NewsCard;
