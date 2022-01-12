import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../SearchBar'

describe('SearchBar component', () => {
  const labelText = 'Search for images'

  it('emits changes when query change', () => {
    const mockOnChange = jest.fn()
    const testQuery = 'new query'
    render(<SearchBar onChange={mockOnChange} />)

    fireEvent.change(screen.getByLabelText(labelText), {
      target: { value: testQuery }
    })

    expect(mockOnChange).toHaveBeenCalledWith(testQuery)
  })

  it('renders current query from props', () => {
    const testQuery = 'new query'
    render(<SearchBar query={testQuery} />)

    expect(screen.getByDisplayValue(testQuery)).toBeInTheDocument()
  })
})


