import React, { Fragment } from "react"
import StoreContext from "./_storages/StoreContext"
import { useNavigate } from "react-router"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography  from "@mui/material/Typography"
import IconButton from '@mui/material/IconButton';
import InsightsIcon from '@mui/icons-material/Insights';
import { AccountCircle } from "@mui/icons-material"
import UserContext from "./_storages/UserContext"

function MenuBar() {
  const { data, error, isLoading } = React.useContext(StoreContext)
  const { user } = React.useContext(UserContext)

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        {Boolean(!error && !isLoading && data) && (
          <Fragment>
            <Typography onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {data.name}
            </Typography>
            <IconButton color="inherit" onClick={() => navigate("/chart")} aria-label="chart">
              <InsightsIcon />
            </IconButton>
            {Boolean(user) && (
              <Button
                color="inherit"
                aria-label="user"
                onClick={() => navigate("/user")}
                startIcon={<AccountCircle />}>
                {user}
              </Button>
            )}
          </Fragment>
        )}


      </Toolbar>
    </AppBar>)
}

export default MenuBar