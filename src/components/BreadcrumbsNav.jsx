import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';

const BreadcrumbsNav = ({ product }) => {
  return (
    <Box role="presentation" sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/products"
        >
          {product?.breadcrumbs[0]?.label}
        </Link>
        <Typography color="text.primary">{product?.cluster?.clusterInfoDto?.h1}</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNav;