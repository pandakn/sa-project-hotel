import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
  title: string,
  price: number,
  img: string,
}

const MediaCard = ({ title, price, img }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt="green iguana"
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h5" component="div" style={{textTransform: "capitalize"}}>
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" style={{textTransform: "capitalize"}}>
            ฿{price}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Select Room</Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;