import React from 'react'

import { Button } from './styles'

function RoundButton(props) {
  return (
    <Button {...props}>
      <div>
        <props.icon size={props.size} />
      </div>
    </Button>
  )
}

export default RoundButton
