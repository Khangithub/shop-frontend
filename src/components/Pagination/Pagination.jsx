import React from 'react'
import { Row, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import history from '../../history'
import PropTypes from 'prop-types'

export default function Pagination (props) {
  const { title, to, index, total } = props

  return (
    <div className='Products'>
      <Row style={{ margin: '25px' }}>
        <Col style={{ textTransform: 'uppercase', color: 'gray' }}>{title}</Col>

        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {index < 1 ? history.goBack() : ''}

          <Link to={`${to}/1`}>
            <Button variant='light' style={{ color: '#6c757d' }}>
              1
            </Button>
          </Link>
          <Link to={`${to}/${index - 1}`}>
            <Button variant='light' style={{ color: '#6c757d' }}>
              ◀◀ 
            </Button>
          </Link>
          <Link to={`${to}/${index}`}>
            <Button variant='outline-secondary'>{index}</Button>
          </Link>
          <Link to={`${to}/${index + 1}`}>
            <Button variant='light' style={{ color: '#6c757d' }}>
             ▶▶
            </Button>
          </Link>
          <Link to={`${to}/${total}`}>
            <Button variant='light' style={{ color: '#6c757d' }}>
              {total}
            </Button>
          </Link>
          {index > total ? history.goBack() : ''}
        </Col>
      </Row>
    </div>
  )
}

Pagination.prototype = {
  title: PropTypes.string,
  to: PropTypes.number,
  index: PropTypes.number,
  total: PropTypes.number
}
