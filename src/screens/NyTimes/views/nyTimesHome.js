import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getNyHomeDetails } from "../services/nyTimesAction";
import NewsCard from "./newsCard";
import "./nyTimes.scss";

const NyTimesHome = () => {
  let dispatch = useDispatch();
  let { newsType } = useParams();
  useEffect(() => {
    dispatch(getNyHomeDetails({ newsType }));
  }, []);

  let { nyHomeResources } = useSelector((state) => state.nyTimesReducer);
  console.log("nyHomeResources", nyHomeResources);
  return (
    <div className="NyTimes">
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={4}>
          {nyHomeResources.map((value) => {
            if (value.title) {
              return (
                <Grid key={value.short_url} item xs={12} lg={4} md={6}>
                  <NewsCard article={value} isArticlePage={false} />
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
