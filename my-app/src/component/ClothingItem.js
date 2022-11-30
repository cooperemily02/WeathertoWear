import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import img from "../static/W2W.png";
import top from "../static/top.png"
import bottom from "../static/bottom.png"
import shoes from "../static/shoes.jpg"
import coat from "../static/coat.png"

function ClothingItem(props) {
  const item = props.item;
  if ("img" in item){
    img = item.img
  }
  else{
    item.tags.forEach(tag => {
      if(tag === "top"){img = top}
      if(tag === "bottom"){img = bottom}
      if(tag === "shoes"){img = shoes}
      if(tag === "outerwear"){img = coat}
    })
  }

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia component="img" height="100%" width="100%"image={img} alt={item.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography gutterBottom variant="h6" sx={{textAlign: "left", textDecoration: 'underline'}}>
            Tags
          </Typography>
          {item.tags.map((tag) => {
            return <ul style = {{textAlign: "left"}}><Typography variant = "body">{tag}</Typography></ul>;
          })}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default ClothingItem;
