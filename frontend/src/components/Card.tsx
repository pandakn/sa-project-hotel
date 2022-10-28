import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  price: number;
  bed: string;
  size: string;
  img: string;
  description: string;
  roomNumber: string;
};

export default function MediaControlCard({
  title,
  price,
  bed,
  size,
  img,
  description,
  roomNumber,

}: Props) {
  const roomSize = size.split(" ")[0];

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
      className={title}
    >
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
        <Typography variant="h5" style={{ marginBottom: "0.5rem" }}>
          เลขห้อง: {roomNumber}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginBottom: "0.5rem" }}
        >
          Room Size: {roomSize} <span>m&#178;</span>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginBottom: "0.5rem" }}
        >
          {bed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          โซนห้อง: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
