import React, {useContext} from "react";
import { Grid, Pagination, Typography } from "@mui/material";
import { NewsContext } from "../context/NewsContext";

export const CustomPagination = (props) => {
  const { totalCount, pageInitialSize, page, setPage, list } = props;
  const { themeMode } = useContext(NewsContext);
  return (
    <div
      style={{
        backgroundColor: themeMode === "light" ? "#f6f6f6" : "#191e27",
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Pagination
                color="primary"
                count={Math.ceil(totalCount / pageInitialSize) || 0}
                page={page}
                onChange={(event, value) => setPage(value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ paddingRight: "10px" }}>
          {list?.length > 0 && (
            <Typography>
              Displaying {" "}
              {page * pageInitialSize - pageInitialSize + 1} - {" "}
              {page * pageInitialSize > totalCount
                ? totalCount
                : page * pageInitialSize}{" "}
              of {totalCount}
            </Typography>
          )}
          {list?.length === 0 && "No Data"}
        </Grid>
      </Grid>
    </div>
  );
};
