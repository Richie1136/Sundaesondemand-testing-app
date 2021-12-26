import React from 'react'
import Col from 'react-bootstrap/Col'

const ScoopOptions = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
    </Col>
  )
}

export default ScoopOptions