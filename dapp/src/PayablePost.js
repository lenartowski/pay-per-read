import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import { addUsersPermission } from "./web3Client";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [paid, setPaid] = React.useState(false);
  const [payStatus, setPayStatus] = React.useState("Buy access");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBuyClick = () => {
    addUsersPermission(1);
    setPaid(true);
  }

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            LI
          </Avatar>
        }
        title="Article about lorem ipsum"
        subheader="13.08.2022"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam et molestie nunc. Sed consectetur, felis ac commodo eleifend, 
        dui purus mollis libero, a eleifend lorem justo eu magna.
        </Typography>
      </CardContent>
      <CardActions disableSpacing> 
        <Chip onClick={handleBuyClick} label={payStatus} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et molestie nunc. 
          Sed consectetur, felis ac commodo eleifend, dui purus mollis libero, 
          a eleifend lorem justo eu magna.
          </Typography>
          <Typography paragraph>
          Morbi ac nisi vel massa congue pretium eget ut metus. Ut neque augue, 
          bibendum at massa id, volutpat tempor massa. Nullam eu interdum magna. 
          Sed vitae arcu ligula.
          </Typography>
          <Typography paragraph>
          Curabitur vel ex volutpat, hendrerit diam sit amet, facilisis ante. 
          Sed placerat vitae tellus et sodales. Quisque ultricies molestie elementum. 
          Nulla ultricies volutpat rhoncus. Maecenas finibus enim pellentesque dui porta, 
          eget vestibulum lectus eleifend. Maecenas volutpat nibh mi, eget pretium mauris 
          commodo eu. Nam eu mi erat. Proin quis turpis diam. Duis libero nulla, 
          lobortis quis velit at, posuere convallis libero.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
