import React from 'react'
import 'react-dropdown/style.css'
import StoreContext from './_storages/StoreContext'
import UserContext from './_storages/UserContext'
import ErrorBoundary from './ErrorBoundary'
import Spinner from './Spinner/Spinner'
import { useNavigate } from 'react-router'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function UserSelect () {
  const { user, setUser } = React.useContext(UserContext)
  const { data, error, isLoading } = React.useContext(StoreContext)
  const [selected, setSelected] = React.useState(user)

  const navigate = useNavigate()

  const _onSelect = function (event) {
    setSelected(event.target.value)
  }

  const _onConfirm = function () {
    if (selected) {
      setUser(selected)
      navigate('/')
    }
  }

  return (
    <ErrorBoundary force={error}>
      <Spinner show={isLoading} />
      {Boolean(data) && (
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            Select the current user
          </Typography>
          <FormControl sx={{ mx: 0, my: 2, minWidth: 200 }}>
            <InputLabel id='user-label'>User</InputLabel>
            <Select
              labelId='user-label'
              id='user-label'
              label='User'
              value={selected ?? ''}
              onChange={_onSelect}
            >
              {data.employees.map(employee => (
                <MenuItem key={employee} value={employee}>
                  {employee}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction={'row'} sx={{ mx: 0, my: 2 }}>
            <Button
              variant='contained'
              onClick={_onConfirm}
              disabled={!selected}
            >
              Confirm
            </Button>
          </Stack>
        </Paper>
      )}
    </ErrorBoundary>
  )
}

export default UserSelect
