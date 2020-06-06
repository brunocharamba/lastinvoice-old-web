import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Invoice from '../pages/Invoice'
import MatModel from '../components/InvoiceModels/MatModel'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Invoice} />
        <Route path="/invoice" component={Invoice} />
        <Route path="/v" component={MatModel} />
      </Switch>
    </BrowserRouter>
  )
}
