import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Comment";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getArticleComments } from "../services/nyTimesAction";
import API_URL_CONSTANTS from "../../../constants/apiUrlConstants";
import { commentsResponse } from "../../../constants/commentsJson";
import { PaginationHooks } from "../../../customHooks/paginationHooks";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const ArticleComments = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     getArticleComments({ offset: 0, url: API_URL_CONSTANTS.COMMENTS_URL })
  //   );
  // }, []);

  let comments = commentsResponse.results.comments;
  let [noOfPages, resource, handleChange, state, setState] = PaginationHooks(
    comments,
    5
  );
  console.log("comments", comments);
  return (
    <>
      {noOfPages > 1 && (
        <Grid item xs={12} lg={6} xs={12}>
          <Pagination
            className={classes.pagination}
            count={noOfPages}
            page={state.pageNo}
            onChange={handleChange}
          />
        </Grid>
      )}
      <List className={classes.root}>
        {resource &&
          resource.length > 0 &&
          resource.map((value) => {
            return (
              <ListItem key={value.commentID}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={value.commentBody}
                  secondary={moment
                    .unix(value.createDate)
                    .format("MMM DD YYYY hh:mm A")}
                />
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    marginLeft: "20px",
    backgroundColor: "#f1d1d1",
  },
}));

export default ArticleComments;
