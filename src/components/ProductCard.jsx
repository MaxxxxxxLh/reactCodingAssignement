import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export const ProductCard = ({product, grade}) => {
    return (
        <Card
        variant="outlined"
        sx={{ p: 2, display: 'flex', flexWrap: 'wrap', zIndex: 1 }}
        >
        <CardMedia
            component="img"
            width="100"
            height="100"
            alt={product.title}
            src={product.imagesUrls[0]}
            sx={{
            borderRadius: '6px',
            width: { xs: '100%', sm: 100 },
            }}
        />
        <Box sx={{ alignSelf: 'center', ml: 2 }}>
            <Typography variant="body2" color="text.secondary" fontWeight="regular">
            {product.title}
            </Typography>
            <Typography fontWeight="bold" noWrap gutterBottom>
            {product.newBestPrice}€
            </Typography>
            <Chip
            size="small"
            variant="outlined"
            label={grade}
            />
        </Box>
        </Card>
    )
}