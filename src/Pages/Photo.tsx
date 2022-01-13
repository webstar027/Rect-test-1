import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Card from "@material-ui/core/Card";
import { Button } from '@material-ui/core';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { useParams, Navigate } from 'react-router-dom';
import { withWidth } from '@material-ui/core';

type PhotoProps = {
  details: any;
};

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      margin: theme.spacing(5),
    },
    searchBar: {
      marginBottom: theme.spacing(5),
    },
  });
});

const Photo = (props: PhotoProps) => {
  const classes = useStyles();
  const { details } = props;

  let { id } = useParams();

  if (!details) {
    return <Navigate to="/" replace />;
  }

  console.log('~~~~~~~~~ received details', props.details);
  return (
    <div className={classes.root}>
      <Container>
      <Button href="/">← Go Back</Button>

            <Card style={{border: 0, borderRadius:0, boxShadow:'none'}}>
              <CardMedia component="img" width="100%" image={details.urls.full} alt={details.alt_description || ""} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {details.user.name}
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    {details.description}
                  </Typography>
              </CardContent>
            </Card>
      </Container>
    </div>
    
    
  );
};

export default Photo;
