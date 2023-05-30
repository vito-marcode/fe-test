import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import CategoryIcon from '@mui/icons-material/Category';
import FaceIcon from '@mui/icons-material/Face';
import React from "react";

function ProductDetailItem({ data, hideTitle }) {

  const descStyle = !hideTitle ? {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  } : {}

  return (
    <Paper sx={{ p: 2 }}>
      {Boolean(!hideTitle) && <Box sx={{ color: 'primary' }}>{data.title}</Box>}
      <Box
        sx={{
          color: 'text.secondary',
          ...descStyle
        }}>
        {data.description}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
        {Math.floor(data.price)}
        <Box sx={{ fontSize: 22 }}>
          ,{(data.price % 1).toFixed(2).substring(2)}
        </Box>
        <Box sx={{ px: 1 }}>{"€"}</Box>
      </Box>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
        <Box >
          <Chip
            sx={{ color: 'white' }}
            icon={<CategoryIcon />}
            color="secondary"
            size="small"
            label={data.category}
          />
        </Box>
        <Box>
          <Chip
            variant="outlined"
            color="info"
            size="small"
            label={data.employee}
            icon={<FaceIcon />}
          />
        </Box>
      </Box>
    </Paper>
  )
}

export default ProductDetailItem;