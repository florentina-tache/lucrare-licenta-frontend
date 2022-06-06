import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { server } from "../../helpers/utils/constants";

import { AppProviderContext } from "../../integration/context/appProviderContext";
import { useUserDetails } from "../../helpers/hooks/user-details-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Place = ({
  title = "title",
  image = "https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/europe/spain/ibiza/destinations-ibiza-og-image-1200x630.png",
  description = "This impressive paella is a perfect ",
  date = "11-09-2021",
}) => {
  const classes = useStyles();
  const { actions } = useContext(AppProviderContext);
  const [imageUrl] = useUserDetails();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        subheader={`Creation date: ${date}`}
      />
      <CardMedia
        style={{ height: "60vh", width: "100%" }}
        component="img"
        className={classes.media}
        image={`${server}${image}`}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Place;
