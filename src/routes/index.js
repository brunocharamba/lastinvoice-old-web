import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from '../pages/Landing'
import NewInvoice from '../pages/NewInvoice'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/invoice" component={NewInvoice} />
      </Switch>
    </BrowserRouter>
  )
}
