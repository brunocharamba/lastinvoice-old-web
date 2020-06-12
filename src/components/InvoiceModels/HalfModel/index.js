import React from 'react'
import { Select } from 'antd'

import 'antd/dist/antd.css'
import { Container } from './styles'

function HalfModel() {
  const { Option } = Select

  return (
    <Container>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    </Container>
  )
}

export default HalfModel
