import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import InputMask from 'react-input-mask'
import { isMobile } from 'react-device-detect'
import CurrencyFormat from 'react-currency-format'

import ReactToPdf from 'react-to-pdf'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  ControlGroup,
  InputGroup,
  Tab,
  Tabs,
  Position,
  Popover,
  Menu,
  MenuItem as BMenuItem,
  Tooltip,
  Icon,
} from '@blueprintjs/core'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { KeyboardDatePicker } from '@material-ui/pickers'
import moment from 'moment'

import correios from '../../services/correios'
import states from '../../constants/states'

import MatModel from '../../components/InvoiceModels/MatModel'

import { Container, SliderWrapper, ContentWrapper, FormWrapper, PreviewWrapper, Separator, ModelWrapper, ProductWrapper, StyledMatModel } from './styles'

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

const receiverBase = {
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
}

const dataBase = {
  type: 'Venda',
  date: new Date(),
  number: '123',
  products: [],
  total: 0,
  formName: 'AA',
  formCode: '1',
  formCount: '1',
  formPrice: 'R$1,00',
  formBasePrice: 0,
  formMessage: '',
}

function Invoice() {
  const [toPrint, setToPrint] = useState(false)
  const [tabId, setTabId] = useState('third')
  const [emmiter, setEmmiter] = useState(emmiterBase)
  const [receiver, setReceiver] = useState(receiverBase)
  const [data, setData] = useState(dataBase)
  const matRef = useRef(null)

  const documentEmmiterMenu = (
    <Popover
      content={
        <Menu>
          <BMenuItem text="CPF" onClick={() => setEmmiter({ ...emmiter, document: { type: 'CPF', number: '' } })} />
          <BMenuItem text="CNPJ" onClick={() => setEmmiter({ ...emmiter, document: { type: 'CNPJ', number: '' } })} />
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <Button minimal={true} rightIcon="caret-down">
        {emmiter.document?.type}
      </Button>
    </Popover>
  )

  const documentReceiverMenu = (
    <Popover
      content={
        <Menu>
          <BMenuItem text="CPF" onClick={() => setReceiver({ ...receiver, document: { type: 'CPF', number: '' } })} />
          <BMenuItem text="CNPJ" onClick={() => setReceiver({ ...receiver, document: { type: 'CNPJ', number: '' } })} />
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <Button minimal={true} rightIcon="caret-down">
        {receiver.document?.type}
      </Button>
    </Popover>
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setToPrint(true)

    // const input = document.getElementById('pdf-wrapper')
    const input = document.getElementById('wp')

    // console.log(matRef)

    const tempHeight = input.offsetHeight
    const tempTransform = 'scale(0.75)'

    input.style.height = 'max-content'
    input.style.transform = 'scale(1)'

    console.log(input)
    console.log(input.offsetWidth, input.offsetHeight)

    // html2canvas(input, { scrollX: -window.scrollX - 200, scrollY: -window.scrollY, height: 1008, width: 720 }).then((canvas) => {
    html2canvas(input, { height: input.offsetHeight, width: input.offsetWidth }).then((canvas) => {
      // const imgData = canvas.toDataURL('image/png')
      const imgData = canvas.toDataURL()

      saveAs(imgData)

      // const pdf = new jsPDF({ format: 'letter', putOnlyUsedFonts: true })
      // pdf.addImage(imgData, 'PNG', 0, 0)
      // pdf.save('download.pdf')
    })

    input.style.height = tempHeight
    input.style.transform = tempTransform
    setToPrint(false)
  }

  const handleCepChange = async (event, tabId) => {
    const { value } = event.target

    if (tabId === 'first') setEmmiter({ ...emmiter, address: { cep: value } })
    else if (tabId === 'second') setReceiver({ ...receiver, address: { cep: value } })

    if (value.includes('_')) return

    const formattedCep = value.replace('-', '')

    try {
      const response = await correios.get(`${formattedCep}/json/unicode`)
      const { data } = response

      if (response.status !== 200 || !data) return

      if (tabId === 'first') setEmmiter({ ...emmiter, address: { address: data.logradouro, city: data.localidade, state: data.uf, district: data.bairro } })
      else if (tabId === 'second')
        setReceiver({ ...receiver, address: { address: data.logradouro, city: data.localidade, state: data.uf, district: data.bairro } })
    } catch (err) {
      console.log(err)
    }
  }

  const handleClean = (tabId) => {
    if (tabId === 'first') setEmmiter(emmiterBase)
    else if (tabId === 'second') setReceiver(receiverBase)
    else if (tabId === 'third') setData(dataBase)
  }

  const handleValidation = (form, tabId) => {
    // var f = document.getElementsByTagName('form')[0]
    var f = document.getElementById(form)
    if (!f.checkValidity()) return

    if (tabId === 'second') {
    }
    if (tabId === 'second') setTabId('second')
    else if (tabId === 'third') setTabId('third')
  }

  const handleReceiptNumber = () => {
    const now = new Date()
    const dt = moment(now).format('YYMMDD')
    setData({ ...data, number: dt + now.getUTCHours() + now.getMinutes() + now.getSeconds() })
  }

  const handleAdd = () => {
    if (!data.formName || !data.formCount || !data.formPrice) {
      console.log(data)
      alert('Verifique os campos obrigatórios em VERDE.')
      return
    }

    const now = new Date()

    let prod = {
      id: moment(now).format('YYMMDD') + now.getUTCHours() + now.getUTCMinutes() + now.getUTCSeconds() + now.getUTCMilliseconds(),
      name: data.formName,
      code: data.formCode || 'S/N',
      count: parseInt(data.formCount),
      price: data.formPrice,
      basePrice: data.formBasePrice,
    }

    let prods = data.products
    prods.push(prod)

    const newTotal = prods.reduce((sum, { basePrice, count }) => sum + basePrice * count, 0)
    setData({ ...data, total: newTotal, formName: '', formCode: '', formPrice: '', formCount: '', products: prods })
  }

  const handleRemove = (id) => {
    let prods = data.products.filter((item) => item.id !== id)
    const newTotal = prods.reduce((sum, { basePrice, count }) => sum + basePrice * count, 0)

    setData({ ...data, total: newTotal, products: prods })
  }

  function emmiterForm() {
    return (
      <form id="firstForm" onSubmit={handleSubmit}>
        <h2>Dados do Emissor</h2>
        <FormGroup label="Nome" labelFor="text-em-name" labelInfo="(obrigatório)">
          <InputGroup
            id="text-em-name"
            placeholder="*Nome ou Razão Social"
            autoComplete="nope"
            value={emmiter.name}
            onChange={(e) => setEmmiter({ ...emmiter, name: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup label="CPF/CNPJ" labelFor="text-input" labelInfo="(obrigatório)">
          <InputMask
            autoComplete="nope"
            mask={emmiter.document?.type === 'CPF' ? '999.999.999-99' : '99.999.999/9999-99'}
            value={emmiter.document?.number}
            onChange={(e) => setEmmiter({ ...emmiter, document: { ...emmiter.document, number: e.target.value } })}
            required
          >
            <InputGroup id="text-input" placeholder="*CPF ou CNPJ" leftElement={documentEmmiterMenu} />
          </InputMask>
        </FormGroup>
        <FormGroup label="CEP" labelFor="text-input" labelInfo="">
          <InputMask autoComplete="nope" mask="99999-999" value={emmiter.address.cep} onChange={(event) => handleCepChange(event, 'first')}>
            <InputGroup id="text-input" placeholder="CEP" autoComplete="nope" />
          </InputMask>
        </FormGroup>
        <FormGroup label="Endereço" labelFor="text-input">
          <InputGroup
            id="text-input"
            placeholder="Endereço"
            autoComplete="nope"
            value={emmiter.address.address}
            onChange={(event) => setEmmiter({ ...emmiter, address: { ...emmiter.address, address: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={isMobile}>
            <InputGroup
              id="text-input"
              placeholder="Número"
              autoComplete="nope"
              value={emmiter.address.number}
              onChange={(event) => setEmmiter({ ...emmiter, address: { ...emmiter.address, number: event.target.value } })}
            />
            <Separator />
            <InputGroup
              id="text-input"
              placeholder="Complemento"
              autoComplete="nope"
              value={emmiter.address.comp}
              onChange={(event) => setEmmiter({ ...emmiter, address: { ...emmiter.address, comp: event.target.value } })}
            />
          </ControlGroup>
          <Separator />
          <InputGroup
            id="text-input"
            placeholder="Cidade"
            autoComplete="nope"
            value={emmiter.address.city}
            onChange={(event) => setEmmiter({ ...emmiter, address: { ...emmiter.address, city: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={isMobile}>
            <InputGroup
              id="text-input"
              placeholder="Bairro"
              autoComplete="nope"
              value={emmiter.address.district}
              onChange={(event) => setEmmiter({ ...emmiter, address: { ...emmiter.address, district: event.target.value } })}
            />
            <Separator />
            <select id="fromState" value={emmiter.address.state} onChange={(event) => setEmmiter({ ...emmiter, address: { state: event.target.value } })}>
              <option selected disabled="disabled" placeholder="Estado"></option>
              {states.map((item) => {
                return (
                  <option key={item.id} value={item.uf}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          </ControlGroup>
        </FormGroup>
        <FormGroup label="Email/Site" labelFor="text-input">
          <InputGroup
            id="text-input"
            placeholder="Email"
            name="email"
            autoComplete="nope"
            value={emmiter.email}
            onChange={(e) => setEmmiter({ ...emmiter, email: e.target.value })}
          />
          <Separator />
          <InputGroup
            id="text-input"
            placeholder="Site"
            autoComplete="nope"
            value={emmiter.site}
            onChange={(e) => setEmmiter({ ...emmiter, site: e.target.value })}
          />
          <Separator />
          <InputGroup
            id="text-input"
            placeholder="Telefone"
            autoComplete="nope"
            value={emmiter.phone}
            onChange={(e) => setEmmiter({ ...emmiter, phone: e.target.value })}
          />
        </FormGroup>
        <div id="buttons">
          <Button intent="warning" text="Limpar" onClick={() => handleClean('first')} />
          <Button rightIcon="arrow-right" intent="success" text="Seguir" onClick={() => handleValidation('firstForm', 'second')} type="submit" />
        </div>
      </form>
    )
  }

  function receiverForm() {
    return (
      <form id="secondForm" onSubmit={handleSubmit}>
        <h2>Dados do Cliente</h2>
        <FormGroup label="Nome" labelFor="text-input" labelInfo="(obrigatório)">
          <InputGroup
            id="text-input"
            placeholder="*Nome ou Razão Social"
            autoComplete="nope"
            value={receiver.name}
            onChange={(e) => setReceiver({ ...receiver, name: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup label="CPF/CNPJ" labelFor="text-input" labelInfo="(obrigatório)">
          <InputMask
            autoComplete="nope"
            mask={receiver.document?.type === 'CPF' ? '999.999.999-99' : '99.999.999/9999-99'}
            value={receiver.document?.number}
            onChange={(e) => setReceiver({ ...receiver, document: { ...receiver.document, number: e.target.value } })}
            required
          >
            <InputGroup id="text-input" placeholder="*CPF ou CNPJ" leftElement={documentReceiverMenu} />
          </InputMask>
        </FormGroup>
        <FormGroup label="CEP" labelFor="text-input" labelInfo="(obrigatório)">
          <InputMask autoComplete="nope" mask="99999-999" value={receiver.address.cep} onChange={(event) => handleCepChange(event, 'second')}>
            <InputGroup id="text-input" placeholder="*CEP" autoComplete="nope" />
          </InputMask>
        </FormGroup>
        <FormGroup label="Endereço" labelFor="text-input" labelInfo="(obrigatório)">
          <InputGroup
            id="text-input"
            placeholder="*Endereço"
            autoComplete="nope"
            value={receiver.address.address || ''}
            onChange={(event) => setReceiver({ ...receiver, address: { ...receiver.address, address: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={false}>
            <InputGroup
              id="text-input"
              placeholder="*Número"
              autoComplete="nope"
              value={receiver.address.number}
              onChange={(event) => setReceiver({ ...receiver, address: { ...receiver.address, number: event.target.value } })}
            />
            <InputGroup
              id="text-input"
              placeholder="Complemento"
              autoComplete="nope"
              value={receiver.address.comp}
              onChange={(event) => setReceiver({ ...receiver, address: { ...receiver.address, comp: event.target.value } })}
            />
          </ControlGroup>
          <Separator />
          <InputGroup
            id="text-input"
            placeholder="*Cidade"
            autoComplete="nope"
            value={receiver.address.city}
            onChange={(event) => setReceiver({ ...receiver, address: { ...receiver.address, city: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={false}>
            <InputGroup
              id="text-input"
              placeholder="*Bairro"
              autoComplete="nope"
              value={receiver.address.district}
              onChange={(event) => setReceiver({ ...receiver, address: { ...receiver.address, district: event.target.value } })}
            />
            <select
              id="fromState"
              value={receiver.address.state}
              onChange={(event) => setReceiver({ ...receiver, address: { ...receiver.address, state: event.target.value } })}
            >
              {states.map((item) => {
                return (
                  <option key={item.id} value={item.uf}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          </ControlGroup>
        </FormGroup>
        <FormGroup label="Email" labelFor="text-input">
          <InputGroup
            id="text-input"
            placeholder="Email"
            autoComplete="nope"
            value={receiver.email}
            onChange={(e) => setReceiver({ ...receiver, email: e.target.value })}
          />
          <Separator />
          <InputGroup
            id="text-input"
            placeholder="Telefone"
            autoComplete="nope"
            value={receiver.phone}
            onChange={(e) => setReceiver({ ...receiver, phone: e.target.value })}
          />
        </FormGroup>
        <div id="buttons">
          <Button icon="arrow-left" intent="primary" text="Voltar" onClick={() => setTabId('first')} />
          <Button
            intent="warning"
            text="Limpar"
            onClick={() => {
              handleClean('second')
            }}
          />
          <Button rightIcon="arrow-right" intent="success" text="Seguir" onClick={() => handleValidation('secondForm', 'third')} type="submit" />
        </div>
      </form>
    )
  }

  function dataForm() {
    return (
      <form id="thirdForm" onSubmit={handleSubmit}>
        <h2>Dados do Ordenado</h2>
        <FormGroup label="Tipo" labelFor="type">
          <FormControl id="type" required>
            <Select id="sel" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} displayEmpty>
              <MenuItem value="Venda">Venda</MenuItem>
              <MenuItem value="Serviço">Serviço</MenuItem>
              <MenuItem value="Orçamento">Orçamento</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <FormGroup label="Data" labelFor="text-input" labelInfo="(obrigatório)">
          <FormControl id="date" required>
            <KeyboardDatePicker clearable value={data.date} onChange={(date, value) => setData({ ...data, date: date })} format="DD/MM/yyyy" />
          </FormControl>
        </FormGroup>
        <FormGroup label="Recibo" labelFor="num-receipt">
          <InputGroup
            id="num-receipt"
            placeholder="Número do recibo"
            maxLength="20"
            required
            value={data.number}
            onChange={(e) => setData({ ...data, number: e.target.value })}
            rightElement={
              <Tooltip content="Gerar Número">
                <Button minimal={false} intent="success" icon="refresh" onClick={() => handleReceiptNumber()}>
                  Gerar
                </Button>
              </Tooltip>
            }
          />
        </FormGroup>
        <FormGroup label="Entrada" labelFor="text-input" labelInfo="(obrigatório)">
          <InputGroup
            id="text-input"
            fill
            placeholder="*Nome"
            value={data.formName}
            onChange={(e) => setData({ ...data, formName: e.target.value })}
            required
            autoComplete="nope"
          />
          <Separator />
          <InputGroup id="text-input" placeholder="*Código" value={data.formCode} onChange={(e) => setData({ ...data, formCode: e.target.value })} />
          <Separator />
          <ControlGroup vertical={false}>
            <InputGroup
              autoComplete="nope"
              id="text-input"
              placeholder="*Quantidade"
              type="number"
              min="0"
              value={data.formCount}
              onChange={(e) => setData({ ...data, formCount: e.target.value })}
              maxLength="30"
              required
              autoComplete="nope"
            />
            <CurrencyFormat
              autoComplete="nope"
              id="currency"
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'R$'}
              value={data.formPrice}
              onValueChange={(values) => setData({ ...data, formPrice: values.formattedValue, formBasePrice: parseFloat(values.value) })}
              required
              autoComplete="nope"
            />
          </ControlGroup>
          <Separator />
          <Button rightIcon="add" fill intent="success" text="Adicionar" onClick={() => handleAdd()} />
          <div id="list">
            {data.products?.length > 0
              ? data.products.map((p, i) => {
                  return (
                    <ProductWrapper key={p.id}>
                      <Tooltip content={p.name}>
                        <span>{p.name}</span>
                      </Tooltip>
                      <div>
                        {p.count} x {p.price}
                      </div>
                      <a>
                        <Tooltip content="Remover">
                          <Icon icon="cross" iconSize={15} color="red" onClick={() => handleRemove(p.id)} />
                        </Tooltip>
                      </a>
                    </ProductWrapper>
                  )
                })
              : 'Nenhum registro...'}
          </div>
        </FormGroup>
        <div id="buttons">
          <Button icon="arrow-left" intent="primary" text="Voltar" onClick={() => setTabId('second')} />
          <Button
            intent="warning"
            text="Limpar"
            onClick={() => {
              handleClean('third')
            }}
          />
          <Button rightIcon="thumbs-up" intent="success" text="Gerar Recibo" type="submit" />
          {/* <ReactToPdf targetRef={ref} filename="code-example.pdf" options={{ format: 'a4' }}>
            {({ toPdf }) => <Button rightIcon="thumbs-up" intent="success" text="Gerar Recibo" onClick={toPdf} />}
          </ReactToPdf> */}
        </div>
      </form>
    )
  }

  return (
    <Container>
      <h2>RECIBO DE PAGAMENTO</h2>
      <SliderWrapper>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={2}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Slider>
      </SliderWrapper>
      <ContentWrapper>
        <FormWrapper>
          <Card id="formCard" interactive={false} elevation={Elevation.TWO}>
            <Tabs id="TabsExample" selectedTabId={tabId}>
              <Tab id="first" title="1. Emissor" panel={emmiterForm()} />
              <Tab id="second" title="2. Cliente" panel={receiverForm()} />
              <Tab id="third" title="3. Ordenado" panel={dataForm()} />
            </Tabs>
          </Card>
        </FormWrapper>
        <PreviewWrapper id="pdf-wrapper">
          <div id="wp">
            <StyledMatModel ref={matRef} emmiter={emmiter} receiver={receiver} data={data} isPreview={true}></StyledMatModel>
          </div>
        </PreviewWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default Invoice
