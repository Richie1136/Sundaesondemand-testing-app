import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const SummaryForm = ({ setOrderPhase }) => {
  const [isChecked, setIsChecked] = useState(false)

  const popover = (
    <Popover id='termsandconditions-popover'>
      No Ice cream will actually be delivered
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // pass along to the next phase.
    // The next page will handle submitting order from context.
    setOrderPhase("completed");
  }

  return (
    <Form onSubmit={handleSubmit}>
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