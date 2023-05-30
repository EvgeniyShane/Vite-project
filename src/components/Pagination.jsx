import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BasicPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (_, pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default BasicPagination;
