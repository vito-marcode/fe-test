import React, { Fragment } from 'react'
import ProductsList from '../components/ProductsList'
import StoreContext from '../components/_storages/StoreContext'
import PageTitle from '../components/PageTitle'

function HomePage () {
  const { data } = React.useContext(StoreContext)

  return (
    <Fragment>
      <PageTitle>{data && data.name ? data.name : ''}</PageTitle>
      <ProductsList />
    </Fragment>
  )
}

export default HomePage
