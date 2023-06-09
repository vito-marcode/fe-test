import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

export default function AlertDialog ({ open, setOpen, onConfirm }) {
  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{'Delete this product?'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
