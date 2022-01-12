import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NotificationErros from '../NotificationErrors'

describe('NotificationErros component', () => {
  const errors = [
    'an error has ocurred.',
    'service not available'
  ]

	it('display errors', () => {
    render(<NotificationErros errors={errors} />)

    errors.forEach(
      error => expect(screen.getByText(error)).toBeInTheDocument()
    )
  })

  it('calls onClose callback when closing notification', () => {
    const onCloseHandler = jest.fn()
    render(<NotificationErros errors={errors} onClose={onCloseHandler} />)

    fireEvent.click(screen.getByTitle('Close'))

    expect(onCloseHandler).toHaveBeenCalled()
  })
})