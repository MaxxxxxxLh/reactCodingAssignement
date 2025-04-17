import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadcrumbsNav = ({ product }) => {
  const breadcrumbs = product?.breadcrumbs || [];

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link color="inherit" underline="hover" href="/">Accueil</Link>
      {breadcrumbs.map((crumb, index) =>
        index < breadcrumbs.length - 1 ? (
          <Link
            key={crumb.url}
            color="inherit"
            underline="hover"
            href={crumb.url}
          >
            {crumb.label}
          </Link>
        ) : (
          <Typography key={crumb.url} color="text.primary">
            {crumb.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
