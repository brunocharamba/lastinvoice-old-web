import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Invoice from '../pages/Invoice'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Invoice} />
        <Route path="/invoice" component={Invoice} />
      </Switch>
    </BrowserRouter>
  )
}
