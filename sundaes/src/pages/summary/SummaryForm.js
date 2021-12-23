import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Popover } from 'bootstrap'
import { OverlayTrigger } from 'react-bootstrap'

const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(false)

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Content>
        No Ice cream will actually be delivered
      </Popover.Content>
    </Popover>
  )
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  )


  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckbox}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type='submit' disabled={!isChecked}>
        Confirm Order
      </Button>
    </Form>
  );
}

export default SummaryForm
