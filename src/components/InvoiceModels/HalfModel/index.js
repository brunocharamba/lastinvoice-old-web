import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Select, Input } from 'antd'
import { Creators as Actions } from '../../../store/ducks/invoice'

import 'antd/dist/antd.css'
import { Container, Information, Fill, FillD, Data, HorizontalSeparator, StyledInput } from './styles'

function HalfModel() {
  const emmiter = useSelector((state) => state.invoice.emmiter)
  const receiver = useSelector((state) => state.invoice.receiver)
  const data = useSelector((state) => state.invoice.data)
  const dispatch = useDispatch()

  const { Option } = Select

  // <Container>
  //   <Select
  //     showSearch
  //     style={{ width: 200 }}
  //     placeholder="Select a person"
  //     optionFilterProp="children"
  //     filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  //   >
  //     <Option value="jack">Jack</Option>
  //     <Option value="lucy">Lucy</Option>
  //     <Option value="tom">Tom</Option>
  //   </Select>
  // </Container>

  console.log(emmiter)

  return (
    <Container>
      <Information>
        <div id="logo">LOGO</div>
        <div id="title">{emmiter.name}</div>
        <div id="company">
          <h5>http://www.joanajuliao.com.br</h5>
          <StyledInput placeholder="Basic usage" />

          <h5>info.joanajuliao@gmail.com</h5>
        </div>
        <button onClick={() => dispatch(Actions.setEmmiter({ ...emmiter, name: 'Joana Julião' }))}>AAA</button>
        <button onClick={() => dispatch(Actions.setEmmiter({ ...emmiter, email: 'email@eamil.com' }))}>BBB</button>
        <HorizontalSeparator />
        <div id="photo">FOTO</div>
        <div id="client-title">Sindel dos Santos Medeiros Charamba</div>
        <div id="client">
          <a href="http://www.joanajuliao.com.br" target="_blank" rel="noopener noreferrer">
            <h5>http://www.joanajuliao.com.br</h5>
          </a>
          <a href="mailto:teste">
            <h5>info.joanajuliao@gmail.com</h5>
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
