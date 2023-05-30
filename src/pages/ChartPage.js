import React, { Suspense, lazy } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import useDataProvider from '../hooks/useDataProvider'
import Spinner from '../components/Spinner/Spinner'
import config from '../config/config'
import Container from '@mui/material/Container'
import PageBreadcrumbs from '../components/PageBreadcrumbs'
import PageTitle from '../components/PageTitle'
import Paper from '@mui/material/Paper'
const PolarAreaChartLazy = lazy(() => import('../components/PolarAreaChart'))

function ChartPage () {
  const url = config.baseUrl + 'stores/' + config.idStore + '/stats/categories'
  const { error, isLoading, data } = useDataProvider({
    url: url
  })
  return (
    <Container maxWidth='sm' sx={{ p: 0 }}>
      <PageBreadcrumbs current={'Chart'} />
      <PageTitle>Chart</PageTitle>
      <ErrorBoundary force={error}>
        <Spinner show={isLoading} />
        {Boolean(data) && (
          <Paper sx={{ p: 2 }}>
            <Suspense fallback={<Spinner show />}>
              <PolarAreaChartLazy data={data} />
            </Suspense>
          </Paper>
        )}
      </ErrorBoundary>
    </Container>
  )
}

export default ChartPage
