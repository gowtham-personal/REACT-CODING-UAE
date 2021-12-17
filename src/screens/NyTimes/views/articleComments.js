import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Comment";
import moment from "moment";
import { commentsResponse } from "../../../constants/commentsJson";
import { PaginationHooks } from "../../../customHooks/paginationHooks";
import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const ArticleComments = () => {
  let comments = commentsResponse.results.comments;
  let [noOfPages, resource, handleChange, state, setState] = PaginationHooks(
    comments,
    5
  );
  console.log("comments", comments);
  return (
    <>
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
      {noOfPages > 1 && (
        <Grid item xs={12} lg={12} xs={12}>
          <Pagination
            count={noOfPages}
            page={state.pageNo}
            onChange={handleChange}
            color="secondary"
          />
        </Grid>
      )}
    </>
  );
};

export default ArticleComments;
