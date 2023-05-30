import React, { Fragment, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import useDataProvider from "../hooks/useDataProvider";
import Spinner from "../components/Spinner/Spinner";
import config from "../config/config";
import Container from "@mui/material/Container";
import PageTitle from "../components/PageTitle";
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import ProductDetailItem from "../components/ProductDetailItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from "../components/AlertDialog";
import { Button } from "@mui/material";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { data: stateData } = location.state || {};
  const url = config.baseUrl + 'stores/' + config.idStore + '/products/' + id
  const { error, isLoading, data: apiData } = useDataProvider({
    url: url,
    preventCall: stateData || !id,
  });

  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    setDeleteLoading(true)
    axios.delete(url)
        .then(() => {
          setDeleteLoading(false)
          navigate(`/`)
        })
        .catch((error) => {
          console.log(error)
      });
  };

  const data = stateData || apiData;
  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      <ErrorBoundary force={!id || error}>
        {Boolean(data) && (
          <Fragment>
            <PageBreadcrumbs
              current={data.title}
            />
            <Spinner show={(!stateData && isLoading) || deleteLoading } />
            <AlertDialog
              open={open}
              setOpen={setOpen}
              onConfirm={handleConfirm}
             />
            <PageTitle>{data.title}</PageTitle>
            <Box sx={{ py: 2, display: "flex", justifyContent: "end" }}>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
              Delete
            </Button>
            </Box>
            <ProductDetailItem data={data} hideTitle />
            <Box sx={{ py: 5 }}>
              <Typography variant="h6" gutterBottom>
                Reviews
              </Typography>
              {Boolean(data.reviews && data.reviews.length > 0) ?
                data.reviews.map((review, k) => 
                  <Typography sx={{pb: 1}} key={k} variant="body1" gutterBottom>
                    {review}
                  </Typography>
                ) : <Typography variant="body1" gutterBottom>
                No reviews yet
              </Typography>
              }             
              
            </Box>
          </Fragment>
        )}
      </ErrorBoundary>
    </Container>
  );
}

export default ProductDetail