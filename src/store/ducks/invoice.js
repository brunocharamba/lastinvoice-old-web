// TYPES
export const Types = {
  // api
  SET_EMMITER: 'invoice/SET_EMMITER',
  SET_RECEIVER: 'invoice/SET_RECEIVER',
  SET_DATA: 'invoice/SET_DATA',
}

// REDUCER
const INITIAL_STATE = {
  emmiter: {
    name: null,
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
    message: '',
  },
  receiver: {
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
  },
  data: {
    type: 'Venda',
    date: new Date().toLocaleDateString(),
    number: '',
    products: [],
    total: 0,
  },
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // show
    case Types.SET_EMMITER:
      return { ...state, emmiter: action.payload }
    case Types.SET_RECEIVER:
      return { ...state, receiver: action.payload }
    case Types.SET_DATA:
      return { ...state, data: action.payload }
    default:
      return state
  }
}

// ACTIONS
export const Creators = {
  // show
  setEmmiter: (data) => ({
    type: Types.SET_EMMITER,
    payload: data,
  }),
  setReceiver: (data) => ({
    type: Types.SET_RECEIVER,
    payload: data,
  }),
  setData: (data) => ({
    type: Types.SET_DATA,
    payload: data,
  }),
}
