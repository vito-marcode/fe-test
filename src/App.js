import React, { Fragment } from 'react';

import HomePage from "./pages/HomePage"
import UserPage from "./pages/UserPage"
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import UserContext from './components/_storages/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Container } from '@mui/material';
import MenuBar from './components/MenuBar';
import ProductAdd from './pages/ProductAdd';
import ChartPage from './pages/ChartPage';

function App() {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <Fragment>
          <MenuBar />
          <Container sx={{ py: 2 }} maxWidth="lg">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <ProtectedRoute user={user}>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:id"
                element={
                  <ProtectedRoute user={user}>
                    <UserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute user={user}>
                    <ProductDetail />
                  </ProtectedRoute>
                }
              />              
              <Route
                path="/user"
                element={<UserPage />} />
              <Route
                exact
                path="/new-product"
                element={
                  <ProtectedRoute user={user}>
                    <ProductAdd />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/chart"
                element={
                  <ProtectedRoute user={user}>
                    <ChartPage />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </Container>
        </Fragment>
      )}
    </UserContext.Consumer>
  )
}

export default App;
