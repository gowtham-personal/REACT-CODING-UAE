import React, { useEffect } from "react";
import { Grid, Box, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getNyHomeDetails } from "../services/nyTimesAction";
import NewsCard from "./newsCard";
import { NyTimesStyles } from "./nyTimesHomeStyle";

const NyTimesHome = () => {
  const classes = NyTimesStyles()();
  let dispatch = useDispatch();
  let { newsType } = useParams();
  useEffect(() => {
    dispatch(getNyHomeDetails({ newsType }));
  }, []);

  let { nyHomeResources, isLoading } = useSelector(
    (state) => state.nyTimesReducer
  );
  console.log("nyHomeResources", nyHomeResources);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={4}>
          {nyHomeResources.map((value) => {
            if (value.title) {
              return (
                <Grid key={value.short_url} item xs={12} lg={4}>
                  <NewsCard
                    classes={classes}
                    article={value}
                    isArticlePage={false}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default NyTimesHome;
