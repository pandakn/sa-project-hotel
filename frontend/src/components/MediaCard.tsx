import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  price: number;
  bed: string;
  size: string;
  img: string;
};

const MediaCard = ({ title, price, bed, size, img }: Props) => {
  // split เอาแค่ตัวเลข
  const roomSize = size.split(" ")[0];

  return (
    <Card sx={{ maxWidth: 345,boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
      <CardMedia component="img" height="200" image={img} alt="green iguana" />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textTransform: "capitalize" }}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textTransform: "capitalize" }}
          >
            ฿{price}/night
          </Typography>
        </Box>
        <Typography variant="body2" color="text" style={{marginBottom: "0.5rem"}}>
          Room Size: {roomSize} <span>m&#178;</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bed}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Select Room</Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
