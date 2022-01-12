import usePhotoFetcher from '../usePhotoFetcher'
import { renderHook, act } from '@testing-library/react-hooks'
import { Basic } from 'unsplash-js/dist/methods/users/types'
import { ApiResponse } from 'unsplash-js/dist/helpers/response'

type NonEmptyArray<T> = [T, ...T[]];
type ReducedPhotoApiResult = Pick<Basic, 'id' | 'name'>[]
type PhotosApiResponse = ApiResponse<ReducedPhotoApiResult>
type ReducedPhotoApiResponse = Pick<PhotosApiResponse, 'type'  | 'errors'> & {
  response?: {
    results: never | ReducedPhotoApiResult,
    total_pages: number
  }
}

const mockgetPhotos = jest.fn<Promise<ReducedPhotoApiResponse>, never>()

jest.mock('unsplash-js', () => {
	return {
		createApi: () => ({
      search: { getPhotos: mockgetPhotos }
    })
	}
})

const testPhotos = [
  { id: 'abc123', name: 'first.png'},
  { id: 'defg123', name: 'second.png'}
]
const testErrors: NonEmptyArray<string> = ['An internal error has occurred.']

describe('UsePhotoFetcher', () => {
  beforeEach(() => {
    mockgetPhotos.mockClear()
    mockUnsplashSuccessResponse([])
  })

  it('calls getPhotos api with initial query', async () => {
    const query = 'first query'

		const { waitForNextUpdate } = renderPhotoFetcher(query)
    await waitForNextUpdate()

    expect(mockgetPhotos).toHaveBeenCalledWith(
      expect.objectContaining({ query, page: 1 }),
      expect.anything()
    )
  })

	it('exposes fetched photos with initial query', async () => {
    mockUnsplashSuccessResponse(testPhotos)

		const { result, waitForNextUpdate } = renderPhotoFetcher('first query')
    await waitForNextUpdate()

    expect(result.current.photos).toEqual(testPhotos)
	})

  it('exposes errors when fetch request fails', async () => {
    mockUnsplashFailedResponse(testErrors)

		const { result, waitForNextUpdate } = renderPhotoFetcher('first query')
    await waitForNextUpdate()

    expect(result.current.errors).toEqual(testErrors)
  })

  it('clears existing photos when a new request fails', async () => {
    mockUnsplashSuccessResponse(testPhotos)
		const { result, rerender ,waitForNextUpdate } = renderPhotoFetcher('first query')
    await waitForNextUpdate()

    mockUnsplashFailedResponse(testErrors)
    rerender({ query: 'second query' })
    await waitForNextUpdate()

    expect(result.current.photos).toEqual([])
  })

  it('clears existing errors when a new request success', async () => {
    mockUnsplashFailedResponse(testErrors)
		const { result, rerender ,waitForNextUpdate } = renderPhotoFetcher('first query')
    await waitForNextUpdate()

    mockUnsplashSuccessResponse(testPhotos)
    rerender({ query: 'second query' })
    await waitForNextUpdate()

    expect(result.current.errors).toEqual([])
  })

  it('fetches new photos when pagination change', async () => {
    const query = 'first query'
		const { result, waitForNextUpdate } = renderPhotoFetcher(query)
    await waitForNextUpdate()

    const newPage = 2
    act(() => {
      result.current.updatePagination(newPage)
    })
    await waitForNextUpdate()

    expect(mockgetPhotos).toHaveBeenCalledWith(
      expect.objectContaining({ query, page: newPage }),
      expect.anything()
    )
  })

  it('resets pagination to 1 when query changes', async () => {
		const { result, rerender, waitForNextUpdate } = renderPhotoFetcher('first query')
    await waitForNextUpdate()

    act(() => {
      result.current.updatePagination(2)
    })
    rerender({ query: 'second query' })
    await waitForNextUpdate()

    expect(result.current.currentPage).toBe(1)
  })

  it('enables loading flag while request in progress', async () => {
    let resolveQueryResult: (response: ReducedPhotoApiResponse) => void 
    const promiseResult = new Promise<ReducedPhotoApiResponse>(resolve => (resolveQueryResult = resolve))
    mockgetPhotos.mockReturnValue(promiseResult)

		const { result, waitForNextUpdate } = renderPhotoFetcher('first query')

    expect(result.current.loading).toBe(true)
    act(() => {
      resolveQueryResult({
        type: 'success',
        response: { results: [], total_pages: 0 }
      })
    })
    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
  })
})

function renderPhotoFetcher(initialQuery: string) {
  return renderHook(
    ({ query }) => usePhotoFetcher(query, 10),
    { initialProps: { query: initialQuery }}
  )
}

function mockUnsplashSuccessResponse(results: ReducedPhotoApiResult, totalPages = 10) {
  mockgetPhotos.mockReturnValue(
    Promise.resolve({
      type: 'success',
      response: {
        results,
        total_pages: totalPages
      }
    })
  )
}

function mockUnsplashFailedResponse(errors: NonNullable<PhotosApiResponse['errors']>) {
  mockgetPhotos.mockReturnValue(
    Promise.resolve({
      type: 'error',
      errors
    })
  )
}
