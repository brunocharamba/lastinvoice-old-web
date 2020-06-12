import React from 'react'
import { Select } from 'antd'

import 'antd/dist/antd.css'
import { Container, Information, Fill, FillD, Data, HorizontalSeparator } from './styles'

const emmiterBase = {
  name: '',
  phone: '',
  cellphone: '',
  document: {
    type: 'CPF',
    number: '',
    extraNumber: '',
  },
  email: '',
  site: '',
  address: {
    cep: '',
    address: '',
    number: '',
    comp: '',
    city: '',
    state: '',
    district: '',
  },
  logo: '',
}

function HalfModel() {
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

  return (
    <Container>
      <Information>
        <div id="logo">LOGO</div>
        <div id="title">Joana Julião</div>
        <div id="company">
          <h5>http://www.joanajuliao.com.br</h5>
          <h5>info.joanajuliao@gmail.com</h5>
          <h5>21.227.107/0001-47</h5>
        </div>
        <HorizontalSeparator />
        <div id="photo">FOTO</div>
      </Information>
      <Fill />
      <FillD />
      <Data>s</Data>
    </Container>
  )
}

export default HalfModel
