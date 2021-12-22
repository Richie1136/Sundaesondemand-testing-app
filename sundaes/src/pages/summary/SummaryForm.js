import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(false)

  const checkboxLabel = (
    <span>
      I agree to
      <span style={{ color: 'blue' }}>Terms and Conditions</span>
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
