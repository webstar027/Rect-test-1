import { useRef, useState, useEffect, useCallback } from 'react'
import { Basic as Photo } from 'unsplash-js/dist/methods/photos/types'
import { createApi } from 'unsplash-js'
import { ApiResponse } from 'unsplash-js/dist/helpers/response'
import { Photos } from 'unsplash-js/dist/methods/search/types/response'

let unsplashApi: ReturnType<typeof createApi>
const getUnsplashApiInstance = () => {
  if (!unsplashApi) {
    unsplashApi = createApi({
      // TODO: use proxy to secure access key
      // apiUrl: 'https://mywebsite.com/unsplash-proxy',
      accessKey: 'MOQXII4HKGgR8OzYPERjN6Lk1zSWJiaFvGm1BZo7avg',
    })
  }

  return unsplashApi
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const usePhotoFetcher = (query: string, pageSize: number) => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const prevQuery = usePrevious(query)
  const [executedQuery, setExecutedQuery] = useState<string>()


  const handleApiResponse = useCallback((apiResponse: ApiResponse<Photos>) => {
    setExecutedQuery(query)
    if (apiResponse.type === 'error') {
      setErrors(apiResponse.errors)
      setPhotos([])
      setTotalPages(0)
    } else if (apiResponse.response) {
      setErrors([])
      setPhotos(apiResponse.response.results)
      setTotalPages(apiResponse.response.total_pages)
    }
  }, [query])

  const handleApiError = useCallback((error: Error) => {
      if (error.name === 'AbortError') return
      setErrors(['An unexpected error has occurred.'])
  }, [])

  const updatePagination = useCallback((page: number) => {
    setCurrentPage(Math.min(totalPages, page))
  }, [totalPages])

  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])


  useEffect(() => {
    const queryChanged = prevQuery !== query
    if (queryChanged) return setCurrentPage(1)
  // Disables linting rule because it's not needed to watch for changes in prevDebouncedQuery.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => {
    setLoading(true)
    const abortController = new AbortController()
    getUnsplashApiInstance().search.getPhotos(
      { query , page: currentPage, perPage: pageSize },
      { signal: abortController.signal }
    )
    .then(handleApiResponse)
    .catch(handleApiError)
    .finally(() => setLoading(false))

    return () => abortController.abort()
  }, [query, currentPage, pageSize, handleApiResponse, handleApiError])


  return { 
    photos,
    errors,
    totalPages,
    currentPage,
    loading,
    executedQuery,
    updatePagination,
    clearErrors
  }
}

export default usePhotoFetcher