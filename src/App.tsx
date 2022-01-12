import React, {useState} from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import usePhotoFetcher from './hooks/usePhotoFetcher'
import useDebounceState from './hooks/useDebounceState'
import SearchBar from './components/SearchBar'
import PhotoGallery from './components/PhotoGallery'
import NotificationErrors from './components/NotificationErrors'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import NotSearch from './components/NotSearch'
import { themes, ThemeContext, Themec } from './themes'
import {Routes, Route, BrowserRouter,useParams} from 'react-router-dom'
import Single from './components/Signle'

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      margin: theme.spacing(5),
    },
    searchBar: {
      marginBottom: theme.spacing(5)
    }
  })
})
const PAGE_SIZE = 9
const QUERY_DEBOUNCE_DELAY_MS = 100


const Home =()=>{
  const classes = useStyles()
  const [query, setQuery] = React.useState<string>('')
  const debouncedQuery = useDebounceState(query, QUERY_DEBOUNCE_DELAY_MS)
  const {
    photos,
    errors,
    currentPage,
    totalPages,
    loading,
    executedQuery,
    updatePagination,
    clearErrors
  } = usePhotoFetcher(debouncedQuery, PAGE_SIZE)
  const [theme = themes.light, setTheme] = useState<Themec>()
  const toggleTheme = () => {
    setTheme(themes.light === theme ? themes.black : themes.light)
  }
  return (
    <div className={classes.root}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Container>
          <NotificationErrors errors={errors} onClose={clearErrors} />
          <SearchBar className={classes.searchBar} query={query} onChange={setQuery} loading={loading} />
          {(!executedQuery)
            ? <NotSearch />
            : (
              <PhotoGallery 
                photos={photos}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={updatePagination} 
              />
            )
          }
        </Container>
      </ThemeContext.Provider>
    </div>
  )
}
function App() {
  const classes = useStyles()
  const [query, setQuery] = React.useState<string>('')
  const debouncedQuery = useDebounceState(query, QUERY_DEBOUNCE_DELAY_MS)
  const {
    photos,
    errors,
    currentPage,
    totalPages,
    loading,
    executedQuery,
    updatePagination,
    clearErrors
  } = usePhotoFetcher(debouncedQuery, PAGE_SIZE)
  const [theme = themes.light, setTheme] = useState<Themec>()
  const toggleTheme = () => {
    setTheme(themes.light === theme ? themes.black : themes.light)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/post/:id" element={<Single />}/>
      </Routes>
    </BrowserRouter>
  //   <div className={classes.root}>
  //   <ThemeContext.Provider value={{ theme, toggleTheme }}>
  //     <Container>
  //       <NotificationErrors errors={errors} onClose={clearErrors} />
  //       <SearchBar className={classes.searchBar} query={query} onChange={setQuery} loading={loading} />
  //       {(!executedQuery)
  //         ? <NotSearch />
  //         : (
  //           <PhotoGallery 
  //             photos={photos}
  //             currentPage={currentPage}
  //             totalPages={totalPages}
  //             onPageChange={updatePagination} 
  //           />
  //         )
  //       }
  //     </Container>
  //     </ThemeContext.Provider>
  // </div>
  )
}

export default App
