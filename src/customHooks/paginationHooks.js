import { useState } from "react";

/**
 * Reusable code for pagination logic
 * @param {*} infinite
 * @returns
 */
export const PaginationHooks = (resource, noRecordsPerPage) => {
  let [state, setState] = useState({
    pageNo: 1,
  });

  let noOfPages = Math.ceil(resource.length / noRecordsPerPage);
  resource = resource.slice(
    noRecordsPerPage * (state.pageNo - 1),
    noRecordsPerPage * state.pageNo
  );

  const handleChange = (event, value) => {
    setState({ pageNo: value });
  };

  return [noOfPages, resource, handleChange, state, setState];
};
