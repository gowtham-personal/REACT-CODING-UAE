import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Grid, CircularProgress, Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";
import NewsCard from "./newsCard";
import { getSearchedArticles } from "../services/searchArticleAction";
import { PaginationHooks } from "../../../customHooks/paginationHooks";
import "./nyTimes.scss";

const SearchArticle = () => {
  let dispatch = useDispatch();
  let { searchedResource, isLoading } = useSelector(
    (state) => state.nyTimesReducer
  );
  let [noOfPages, resource, handleChange, state, setState] = PaginationHooks(
    searchedResource,
    6
  );

  const searchItems = localStorage.getItem("SEARCH_HISTORY")
    ? JSON.parse(localStorage.getItem("SEARCH_HISTORY"))
    : [];

  const handleOnSearch = (searchKey, results) => {
    dispatch(getSearchedArticles({ searchKey }));
    setState({ pageNo: 1 });
  };

  const handleOnSelect = (searchKey) => {
    dispatch(getSearchedArticles({ searchKey: searchKey.name }));
  };

  const formatResult = (item) => {
    return item;
  };

  return (
    <div className="NyTimes">
      <Grid container item xs={12} lg={12}>
        <Grid item className="search" xs={12} lg={6}>
          <ReactSearchAutocomplete
            items={searchItems}
            placeholder="Search"
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            inputDebounce={300}
            showClear={true}
            maxResults={5}
            formatResult={formatResult}
          />
        </Grid>
        {noOfPages > 1 && (
          <Grid item xs={12} lg={6}>
            <Pagination
              className="pagination"
              count={noOfPages}
              page={state.pageNo}
              onChange={handleChange}
            />
          </Grid>
        )}
      </Grid>
      {isLoading && (
        <Box className="loader" spacing={2} direction="row">
          <CircularProgress color="inherit" />
        </Box>
      )}
      <div className="NyTimes">
        <Grid container spacing={2}>
          <Grid container item xs={12} spacing={4}>
            {resource &&
              resource.length > 0 &&
              resource.map((value) => {
                if (value.abstract) {
                  return (
                    <Grid key={value._id} item xs={12} lg={6}>
                      <NewsCard article={value} isArticlePage={false} />
                    </Grid>
                  );
                }
              })}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SearchArticle;
