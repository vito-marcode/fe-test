import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

function PageTitle (props) {
  return (
    <Stack direction={'row'} sx={{ mx: 0, my: 2 }}>
      <Typography component='h1' variant='h4'>
        {props.children}
      </Typography>
    </Stack>
  )
}

PageTitle.propTypes = {
  children: PropTypes.node
}

export default PageTitle
