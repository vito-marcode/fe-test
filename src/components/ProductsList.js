import React, { Fragment, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import useDataProvider from "../hooks/useDataProvider";
import Spinner from "./Spinner/Spinner";
import config from "../config/config";
import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import ProductDetailItem from "./ProductDetailItem";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import Button  from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";

function ProductsList() {
  const { error, isLoading, data } = useDataProvider({
    url: config.baseUrl + 'stores/' + config.idStore + '/products/',
  });

  const [listView, setListView] = useState(0);

  const navigate = useNavigate();

  function onClick(data) {
    navigate(`/products/${data.id}`, { state: { data: data.data } });
  }

  function toggleAdd() {
    navigate('/new-product');
  }
  return (
    <ErrorBoundary force={error}>
      <Spinner show={isLoading} />
      {Boolean(data) && (
        <Fragment>
          <Box sx={{ py: 2, display: "flex", justifyContent: "end" }}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={toggleAdd}>
              Add Product
            </Button>
            <Hidden smDown >
              <Box sx={{ px: 1 }}>
              {Boolean(listView)
                ? <Button
                  variant="contained"
                  startIcon={<GridViewIcon />}
                  onClick={() => setListView(0)}>
                  Grid View
                </Button>
                : <Button
                  variant="contained"
                  startIcon={<ViewListIcon />}
                  onClick={() => setListView(1)}>
                  List View
                </Button>
              }
            </Box>
            </Hidden>
          </Box>
          <Grid container spacing={3}>
            {data.map(product => (
              <Grid
                key={product.id}
                item
                xs={12}
                sm={listView ? 12 : 6}
                lg={listView ? 12 : 4}
                >
                <Box
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={() => onClick(product)}
                >
                  <ProductDetailItem data={product.data} />
                </Box>
              </Grid>

            ))}
          </Grid>
        </Fragment>

      )}
    </ErrorBoundary>
  );
}

export default ProductsList