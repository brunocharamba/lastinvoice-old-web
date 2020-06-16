import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Creators as Actions } from '../../../store/ducks/invoice'

import 'antd/dist/antd.css'
import { Container, Information, Fill, FillD, Data, HorizontalSeparator, StyledInput, StyledContentEditable } from './styles'

function HalfModel() {
  const emmiter = useSelector((state) => state.invoice.emmiter)
  const receiver = useSelector((state) => state.invoice.receiver)
  const data = useSelector((state) => state.invoice.data)
  const dispatch = useDispatch()

  const handleEmailChange = (event) => {
    // emailRef.current = event.target.value
  }

  return (
    <Container>
      <Information>
        <div id="logo">LOGO</div>
        <div id="title">{emmiter.name}</div>
        <div id="company">
          <h5>http://www.google.com</h5>
          {/* <p>email</p> */}
          <StyledContentEditable
            // html={emmiter.email || 'Type your email...'}
            html={emmiter.email}
            disabled={false}
            onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, email: event.target.value }))}
            placeholder={'Hello, World!'}
          />
        </div>
        <button onClick={() => dispatch(Actions.setEmmiter({ ...emmiter, name: 'Test Name' }))}>AAA</button>
        <button
          onClick={() => {
            console.log(emmiter.email)
          }}
        >
          BBB
        </button>
        <HorizontalSeparator />
        <div id="photo">PHOTO</div>
        <div id="client-title">Full Name</div>
        <div id="client">
          <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
            <h5>http://www.google.com</h5>
          </a>
          <a href="mailto:teste">
            <h5>test@gmail.com</h5>
          </a>
        </div>
      </Information>
      <Fill />
      <FillD />
      <Data>s</Data>
    </Container>
  )
}

export default HalfModel
