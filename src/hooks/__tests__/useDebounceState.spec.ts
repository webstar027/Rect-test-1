import useDebounceState from '../useDebounceState'
import { renderHook, act } from '@testing-library/react-hooks'

describe('UseDebounceState', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('does not update debounced state if delay time has not met', () => {
    const initialState = 1
    const delay = 500
    const { result, rerender } = renderHook(
      ({ state }) => useDebounceState(state, delay),
      { initialProps: { state: initialState } }
    )
    
    rerender({ state: initialState + 1 })
    act(() => {
      jest.advanceTimersByTime(delay / 2)
    })

    expect(result.current).toBe(initialState)
  })

  it('does update debounced state after delay has met', async () => {
    const initialState = 1
    const delay = 500
    const { result, rerender } = renderHook(
      ({ state }) => useDebounceState(state, delay),
      { initialProps: { state: initialState } }
    )
    
    rerender({ state: initialState + 1 })
    act(() => {
      jest.advanceTimersByTime(delay)
    })

    expect(result.current).toBe(initialState + 1)
  })
})