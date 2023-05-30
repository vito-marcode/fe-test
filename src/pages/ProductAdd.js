import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import { Autocomplete, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import useDataProvider from "../hooks/useDataProvider";
import config from "../config/config";
import ErrorBoundary from "../components/ErrorBoundary";
import Spinner from "../components/Spinner/Spinner";
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../components/_storages/UserContext";
export default function ProductAdd() {

  const [isLoading, setIsLoading] = useState(false)
  const { error, isLoading: loadingCategories, data: categoriesData } = useDataProvider({
    url: config.baseUrl + 'stores/' + config.idStore + '/stats/categories'
  });

  const { user } = React.useContext(UserContext)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("")
  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [priceError, setPriceError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault()

    setNameError(false)
    setDescriptionError(false)
    setPriceError(false)
    setCategoryError(false)
    let err = false

    if (name === '') {
      setNameError(true)
      err = true
    }
    if (description === '') {
      setDescriptionError(true)
      err = true
    }
    if (!price) {
      setPriceError(true)
      err = true
    }
    if (!category || category === '') {
      setCategoryError(true)
      err = true
    }

    if (!err) {
      const newProduct = {
        title: name,
        category: category,
        price: ~~price,
        employee: user,
        description: description        
      }
      setIsLoading(true)
      axios.post(config.baseUrl + 'stores/' + config.idStore + '/products', newProduct)
        .then(res => {
          setIsLoading(false)
          navigate(`/products/${res.data}`)
        })
        .catch((error) => {
          if( error.response ){
              console.log(error.response.data);              
          }
      });
    }
  }

  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      <PageBreadcrumbs
        current={"Add Product"}
      />
      <PageTitle>Add Product</PageTitle>
      <ErrorBoundary force={error}>
        <Spinner show={isLoading} />

        <Paper
          sx={{
            p: 2,
            height: 600
          }}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            New Product
          </Typography>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              error={nameError}
              onChange={e => setName(e.target.value)}
              sx={{ mx: 0, mb: 2 }}
            />
            <TextField
              id="description"
              label="Description"
              placeholder="Description"
              value={description}
              error={descriptionError}
              onChange={e => setDescription(e.target.value)}
              multiline
              fullWidth
              rows={4}
              sx={{ mx: 0, mb: 2 }}
            />
            <TextField
              id="price"
              label="Price"
              type="number"
              value={price}
              error={priceError}
              onChange={e => setPrice(e.target.value)}
              sx={{ mx: 0, mb: 2 }}
            />
            <Autocomplete
              id="category"
              freeSolo
              value={category}
              onChange={(e, v) => setCategory(v)}
              options={!loadingCategories && categoriesData ? categoriesData.map((option) => option.category) : []}
              renderInput={(params) => (
                <TextField
                  error={categoryError}
                  {...params}
                  label="Category"
                  onChange={e => setCategory(e.target.value)}
                />
              )}
              fullWidth
              sx={{ mx: 0, mb: 2 }}
            />

            <Stack direction={'row'} sx={{ mx: 0, my: 2 }}>
              <Button type="submit" variant="contained" >Confirm</Button>
            </Stack>
          </form>
        </Paper>

      </ErrorBoundary>
    </Container>
  );
}