import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Comment";
import moment from "moment";
import { commentsResponse } from "../../../constants/commentsJson";
import { PaginationHooks } from "../../../customHooks/paginationHooks";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const ArticleComments = () => {
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
            count={noOfPages}
            page={state.pageNo}
            onChange={handleChange}
          />
        </Grid>
      )}
      <List>
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

export default ArticleComments;
