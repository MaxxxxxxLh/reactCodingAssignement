import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const BreadcrumbsNav = ({ product }) => {
  return (
    <Box role="presentation" sx={{ py: 2, backgroundColor: '#ffffff' }}>
      <Container maxWidth="md">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            fontSize: { xs: '0.85rem', sm: '1rem' },
            flexWrap: 'wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Accueil
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/products"
            sx={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {product?.breadcrumbs?.[0]?.label || "Products"}
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            sx={{
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product?.cluster?.clusterInfoDto?.h1 || "Produit"}
          </Link>
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default BreadcrumbsNav;
