import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

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

  const submit = (e: any) => {
    console.log(e);
    const type = e.target.classList[6];
    console.log(type);
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
      className={title}
    >
      <CardMedia component="img" height="200" image={img} alt="green iguana" />
      <CardContent >
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
        <Typography
          variant="body2"
          color="text"
          style={{ marginBottom: "0.5rem" }}
        >
          Room Size: {roomSize} <span>m&#178;</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bed}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          
          to="/user/booking"
          style={{ textDecoration: "none", textTransform: "uppercase", color: "#0072E5" }}
        >
          <Button className={title} onClick={submit}>Select Room</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
