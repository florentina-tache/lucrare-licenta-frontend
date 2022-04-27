import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { AppProviderContext } from '../../integration/context/appProviderContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Place = ({
  title = 'title',
  subheader = 'subheader',
  image = 'https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/europe/spain/ibiza/destinations-ibiza-og-image-1200x630.png',
  description = 'This impressive paella is a perfect ',
}) => {
  const classes = useStyles();
  const { actions } = useContext(AppProviderContext);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Place;
