import { createStore, compose, applyMiddleware } from 'redux'

import reducers from './ducks'

// const middlewares = []

const Store = createStore(reducers)

export default Store
