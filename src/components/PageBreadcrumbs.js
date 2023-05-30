import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import React from 'react'
import { NavLink } from 'react-router-dom'

function PageBreadcrumbs ({ data, current }) {
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <Link underline='hover' color='inherit' component={NavLink} to='/'>
        Home
      </Link>
      {Boolean(data) &&
        data.map(link => (
          <Link
            underline='hover'
            color='inherit'
            component={NavLink}
            to={link.to}
          >
            {link.name}
          </Link>
        ))}
      {Boolean(current) && (
        <Typography color='text.primary'>{current}</Typography>
      )}
    </Breadcrumbs>
  )
}

export default PageBreadcrumbs
