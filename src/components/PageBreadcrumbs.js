import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function PageBreadcrumbs({data, current}) {

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={NavLink} to="/">
        Home
      </Link>
      {Boolean(data) && data.map(link => (
        <Link underline="hover" color="inherit" component={NavLink} to={link.to}>
          {link.name}
        </Link>
      ))}      
      {Boolean(current) &&
        <Typography color="text.primary">{current}</Typography>
      }
    </Breadcrumbs>
  )
}

export default PageBreadcrumbs;