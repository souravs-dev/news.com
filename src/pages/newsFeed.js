import React, { useState, useEffect, useContext } from "react";
import { axiosRequest } from "../infrastructure/data/useAxios";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Skeleton,
  Typography,
  Stack,
} from "@mui/material";
import { format } from "date-fns";
import { CustomPagination } from "../components/Pagination";
import { NewsContext } from "../context/NewsContext";
import { ThemeToggleSwitch } from "../components/CustomThemeToggle";
import NoThumbnail from "../no-thumbnail.jpg";

const NewsFeedApp = () => {
  const { themeMode, setThemeMode } = useContext(NewsContext);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(100);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState("india");
  const [next, setNext] = useState("");
  const to = new Date();
  const from = new Date(to.getTime() - 86400000 * 2);

  const url = `https://newsapi.org/v2/everything?q=india&from=${from.toISOString()}&to=${to.toISOString()}&sortBy=popularity&apiKey=1a6e8faa4756402893259f2f0418826b&page=${page}&pageSize=${limit}`;
  const techCrunch =
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=1832eacd70184b1cb4b5c202da173566";
  const headlines = `https://newsapi.org/v2/top-headlines?q=war&apiKey=1832eacd70184b1cb4b5c202da173566&page=${page}&pageSize=${limit}`;

  const newUrl = `https://newsdata.io/api/1/latest?apikey=pub_52042a9fcbd4603a1509cc596a8a65fb1349b&q=mental%20health`;

  useEffect(() => {
    setLoading(false);
    axiosRequest(
      headlines,
      "GET",
      null,
      (response) => {
        let result = response.articles.filter(val => val.author != null);
        setData(result);
        //setData(response.results);
        setLoading(true);
        if (result.totalResults < 100) setTotal(result.totalResults);
        //setNext(response.nextPage);
      },
      (error) => {
        console.log(error);
        setLoading(true);
      }
    );
  }, [page]);

  const takeToLink = (event, url) => {
    window.open(url, "_blank");
  };

  const navItems = ["Top Highlights"];

  return (
    <>
      <Box height="100vh" display="flex" flexDirection="column">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <ThemeToggleSwitch
              onClick={() =>
                setThemeMode(themeMode === "light" ? "dark" : "light")
              }
            />
          </Toolbar>
        </AppBar>
        

        <Grid container spacing={2} sx={{ padding: 4  }}>
          {!loading
            ? [0, 0, 0, 0, 0, 0, 0, 0].map((item) => (
                <>
                  <Card sx={{ maxWidth: 320, margin: 1 }}>
                    <Skeleton
                      sx={{ height: 340, width: 400 }}
                      variant="rectangular"
                    />
                    <CardContent>
                      <React.Fragment>
                        <Skeleton height={10} style={{ marginBottom: 6 }} />
                        {[0, 0, 0].map((d) => (
                          <Skeleton height={10} />
                        ))}
                      </React.Fragment>
                    </CardContent>
                    <CardActions>
                      <Skeleton height={20} width="20%" />
                    </CardActions>
                  </Card>
                  {/* )} */}
                </>
              ))
            : data &&
              data.map((item, index) => (
                <>
                  {item.author != null && (
                    <Card sx={{ 
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: 320, 
                      margin: 1 
                    }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={item?.urlToImage || NoThumbnail}
                        title={item.title}
                      />
                      <CardContent sx={{ maxHeight: 300 }}>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="div"
                        >
                          {item.author +
                            " | " +
                            item.publishedAt +
                            " | " +
                            item.source.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <br />
                          {item.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing sx={{ mt: "auto" }}>
                        {/* <Button size="small" >Share</Button> */}

                        <Button
                          size="small"
                          onClick={(event) =>
                            takeToLink(event, item?.url || item?.link)
                          }
                          color="secondary"
                        >
                          Read More
                        </Button>
                      </CardActions>
                    </Card>
                  )}
                </>
              ))}
        </Grid>
      </Box>
      <CustomPagination
        totalCount={total}
        page={page}
        setPage={setPage}
        pageInitialSize={limit}
        list={data}
      />
    </>
  );
};

export default NewsFeedApp;
