import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from '../pages/Landing'
import Invoice from '../pages/Invoice'
import NewInvoice from '../pages/NewInvoice'
import MatModel from '../components/InvoiceModels/MatModel'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/invoice" component={NewInvoice} />
        <Route path="/v" component={MatModel} />
      </Switch>
    </BrowserRouter>
  )
}
