import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import InputMask from 'react-input-mask'
import { isMobile } from 'react-device-detect'
import { Button, Card, Elevation, FormGroup, ControlGroup, InputGroup, Tab, Tabs, Position, Popover, Menu, MenuItem } from '@blueprintjs/core'
import correios from '../../services/correios'
import states from '../../constants/states'

import MatModel from '../../components/InvoiceModels/MatModel'

import { Container, SliderWrapper, ContentWrapper, FormWrapper, PreviewWrapper, Separator } from './styles'

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

function Invoice() {
  const [tabId, setTabId] = useState('first')
  const [emmiter, setEmmiter] = useState(emmiterBase)
  const [receiver, setReceiver] = useState(receiverBase)
  const [receipt, setReceipt] = useState(null)

  const documentMenu = (
    <Popover
      content={
        <Menu>
          <MenuItem text="CPF" onClick={() => setEmmiter({ ...emmiter, document: { type: 'CPF', number: '' } })} />
          <MenuItem text="CNPJ" onClick={() => setEmmiter({ ...emmiter, document: { type: 'CNPJ', number: '' } })} />
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <Button minimal={true} rightIcon="caret-down">
        {emmiter.document?.type}
      </Button>
    </Popover>
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('teste')
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
    else if (tabId === 'third') setReceipt(null)
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
            <InputGroup id="text-input" placeholder="*CPF ou CNPJ" leftElement={documentMenu} />
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
            onChange={(event) => setEmmiter({ ...emmiter, address: { address: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={isMobile}>
            <InputGroup
              id="text-input"
              placeholder="Número"
              autoComplete="nope"
              value={emmiter.address.number}
              onChange={(event) => setEmmiter({ ...emmiter, address: { number: event.target.value } })}
            />
            <Separator />
            <InputGroup
              id="text-input"
              placeholder="Complemento"
              autoComplete="nope"
              value={emmiter.address.comp}
              onChange={(event) => setEmmiter({ ...emmiter, address: { comp: event.target.value } })}
            />
          </ControlGroup>
          <Separator />
          <InputGroup
            id="text-input"
            placeholder="Cidade"
            autoComplete="nope"
            value={emmiter.address.city}
            onChange={(event) => setEmmiter({ ...emmiter, address: { city: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={isMobile}>
            <InputGroup
              id="text-input"
              placeholder="Bairro"
              autoComplete="nope"
              value={emmiter.address.district}
              onChange={(event) => setEmmiter({ ...emmiter, address: { district: event.target.value } })}
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
          <InputGroup id="text-input" placeholder="Email" name="email" autoComplete="nope" />
          <Separator />
          <InputGroup id="text-input" placeholder="Site" autoComplete="nope" />
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
          <InputGroup id="text-input" placeholder="*Nome ou Razão Social" />
        </FormGroup>
        <FormGroup label="CPF/CNPJ" labelFor="text-input" labelInfo="(obrigatório)">
          <InputGroup id="text-input" placeholder="*CPF ou CNPJ" />
        </FormGroup>
        <FormGroup label="CEP" labelFor="text-input" labelInfo="(obrigatório)">
          <InputMask autoComplete="nope" mask="99999-999" value={receiver.address.cep} onChange={(event) => handleCepChange(event, 'second')}>
            <InputGroup id="text-input" placeholder="*CEP" autoComplete="nope" />
          </InputMask>
        </FormGroup>
        <FormGroup label="Endereço" labelFor="text-input" labelInfo="(obrigatório)">
          <InputGroup
            required
            id="text-input"
            placeholder="*Endereço"
            value={receiver.address.address || ''}
            onChange={(event) => setReceiver({ address: { address: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={false}>
            <InputGroup
              id="text-input"
              placeholder="*Número"
              value={receiver.address.number}
              onChange={(event) => setReceiver({ address: { number: event.target.value } })}
            />
            <InputGroup
              id="text-input"
              placeholder="Complemento"
              value={receiver.address.comp}
              onChange={(event) => setReceiver({ address: { comp: event.target.value } })}
            />
          </ControlGroup>
          <Separator />
          <InputGroup
            id="text-input"
            placeholder="*Cidade"
            value={receiver.address.city}
            onChange={(event) => setReceiver({ address: { city: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={false}>
            <InputGroup
              id="text-input"
              placeholder="*Bairro"
              value={receiver.address.district}
              onChange={(event) => setReceiver({ address: { district: event.target.value } })}
            />
            <select id="fromState" value={receiver.address.state} onChange={(event) => setReceiver({ address: { state: event.target.value } })}>
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
          <InputGroup id="text-input" placeholder="Email" />
          <Separator />
          <InputGroup id="text-input" placeholder="Site" />
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

  function receiptForm() {
    return (
      <form id="thirdForm" onSubmit={handleSubmit}>
        <h2>Dados do Ordenado</h2>
        <FormGroup label="Nome" labelFor="text-input" labelInfo="(obrigatório)">
          <InputGroup id="text-input" placeholder="*Nome ou Razão Social" />
        </FormGroup>
        <FormGroup label="CPF/CNPJ" labelFor="text-input" labelInfo="(obrigatório)">
          <InputGroup id="text-input" placeholder="*CPF ou CNPJ" />
        </FormGroup>
        <FormGroup label="CEP" labelFor="text-input" labelInfo="(obrigatório)">
          <InputMask autoComplete="nope" mask="99999-999" value={receiver.address.cep} onChange={handleCepChange}>
            <InputGroup id="text-input" placeholder="*CEP" autoComplete="nope" />
          </InputMask>
        </FormGroup>
        <FormGroup label="Endereço" labelFor="text-input" labelInfo="(obrigatório)">
          <InputGroup
            id="text-input"
            placeholder="*Endereço"
            value={receiver.address.address}
            onChange={(event) => setReceiver({ address: { address: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={false}>
            <InputGroup
              id="text-input"
              placeholder="*Número"
              value={receiver.address.number}
              onChange={(event) => setReceiver({ address: { number: event.target.value } })}
            />
            <InputGroup
              id="text-input"
              placeholder="Complemento"
              value={receiver.address.comp}
              onChange={(event) => setReceiver({ address: { comp: event.target.value } })}
            />
          </ControlGroup>
          <Separator />
          <InputGroup
            id="text-input"
            placeholder="*Cidade"
            value={receiver.address.city}
            onChange={(event) => setReceiver({ address: { city: event.target.value } })}
          />
          <Separator />
          <ControlGroup vertical={false}>
            <InputGroup
              id="text-input"
              placeholder="*Bairro"
              value={receiver.address.district}
              onChange={(event) => setReceiver({ address: { district: event.target.value } })}
            />
            <select id="fromState" value={receiver.address.state} onChange={(event) => setReceiver({ address: { state: event.target.value } })}>
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
          <InputGroup id="text-input" placeholder="Email" required />
          <Separator />
          <InputGroup id="text-input" placeholder="Site" />
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
          <Button rightIcon="thumbs-up" intent="success" text="Validar" type="submit" />
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
              <Tab id="first" title="Emissor" panel={emmiterForm()} />
              {/* <Tab id="second" title="Cliente" panel={receiverForm()} />
              <Tab id="third" title="Ordenado" panel={receiptForm()} /> */}
            </Tabs>
          </Card>
        </FormWrapper>
        <PreviewWrapper>
          {/* <div
            style={{
              height: '200px',
              width: '200px',
              backgroundColor: 'blue',
              transform: 'scale(0.4)',
            }}
          ></div> */}
          <div style={{ transform: 'scale(0.5)' }}>
            <MatModel></MatModel>
          </div>
        </PreviewWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default Invoice
