import Pagination from '@material-ui/lab/Pagination'
import { Basic as UnsplashPhoto } from 'unsplash-js/dist/methods/photos/types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useCallback } from 'react'
import { Link } from "react-router-dom"
export type Photo = Pick<UnsplashPhoto, 'id' | 'alt_description' | 'description'>
  & { user: Pick<UnsplashPhoto['user'], 'name'> }
  & { urls: Pick<UnsplashPhoto['urls'], 'thumb'> }

export interface PhotoGalleryProps {
  photos: Photo[]
  currentPage: number
  totalPages: number
  onPageChange?(newPage: number): void
}

const useStyle = makeStyles((theme: Theme) => {
  return createStyles({
    pagination: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center'
    },
  })
})

const PhotoGallery = (props: PhotoGalleryProps) => {
  const classes = useStyle()
  const onPageChange = props.onPageChange
  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    if (onPageChange) onPageChange(value)
  }, [onPageChange])

  if (props.photos.length === 0) return (
    <Typography variant="h5" align="center" color="textSecondary" paragraph>
      No images matching your search
    </Typography>
  )
  const GoToPhoto=(id:string)=>{
    // const history = useHistory();
    // console.log(id+"============id==========");
    // history.push("/post/id")
    //
    //go to the single page
    return <Link to={"/post/"+id} />
  }
	return (
    <>
    <Grid container spacing={2}>
          {props.photos.map(p => (
            <Grid item xs={12} sm={4} key={p.id}  >
              <Card>
              <Link to={"/post/"+p.id} >
                <CardMedia
                  component="img"
                  width="100%"
                  image={p.urls.thumb}
                  alt={p.alt_description || ''}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {p.user.name}
                  </Typography>
                  
                  {/* <Typography variant="body2" color="textSecondary">
                    {p.description || ''}
                  </Typography> */}
                </CardContent>
              </Link>
            </Card>
            </Grid>
          ))}
    </Grid>
      
      <Pagination
        className={classes.pagination}
        color="primary"
        count={props.totalPages}
        page={props.currentPage}
        onChange={handlePageChange}
        data-testid="photo-gallery--pagination"
      />
    </>
	)
}

export default PhotoGallery