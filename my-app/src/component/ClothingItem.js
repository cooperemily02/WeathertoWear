import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import img from '../static/test-image.png'

function ClothingItem(props) {
    let item = props.item;
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
        {item.tags.map((tag) => {
          return <ul>{tag}</ul>
        })}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default ClothingItem;