import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import RoundButton from '../../../components/RoundButton'

import CurrencyFormat from 'react-currency-format'
import { Creators as Actions } from '../../../store/ducks/invoice'

import { DatePicker, Tooltip } from 'antd'
import moment from 'moment'

import { FaPlus, FaMinus } from 'react-icons/fa'

import {
  Container,
  Top,
  Middle,
  Bottom,
  Separator,
  StyledTableCell,
  StyledTableRow,
  StyledContentEditable,
  StyledDatePicker,
  MyTable,
  MyTableHeaderRow,
  MyTableRow,
  MyTableCell,
} from './styles'

function createData(name, code, count, price) {
  return { name, code, count, price }
}
const defaultRows = [createData('Produto 1', 'AD23A', 1, 398.99), createData('Produto 2', '87ZER', 1, 100.9), createData('Produto 3', 'ZMI1070', 1, 210.0)]

function NewMatModel({ isPreview, showButtons }) {
  const emmiter = useSelector((state) => state.invoice.emmiter)
  const receiver = useSelector((state) => state.invoice.receiver)
  const data = useSelector((state) => state.invoice.data)
  const dispatch = useDispatch()

  const useStyles = makeStyles({
    table: { minWidth: 700 },
    input: { width: 20, maxWidth: 20 },
    desc: { width: showButtons ? 290 : 330, maxWidth: showButtons ? 290 : 330 },
    code: { width: 120, maxWidth: 120 },
    count: { width: 50, maxWidth: 50 },
    price: { width: 100, maxWidth: 100 },
  })

  const handleFocus = () => {
    setTimeout(() => {
      document.execCommand('selectAll', true, null)
    }, 0)
  }

  const handleAdd = () => {
    const now = new Date()

    let prod = {
      id: moment(now).format('YYMMDD') + now.getUTCHours() + now.getUTCMinutes() + now.getUTCSeconds() + now.getUTCMilliseconds(),
      name: '',
      code: '',
      count: '1',
      price: 0,
      basePrice: 0,
      formattedBasePrice: 'R$0,00',
    }

    let prods = data.products
    prods.push(prod)

    const newTotal = prods.reduce((sum, { basePrice, count }) => sum + basePrice * count, 0)
    dispatch(Actions.setData({ ...data, total: newTotal, products: prods }))
  }

  const handleRemove = (id) => {
    var _products = data.products.filter((item) => item.id !== id)

    const newTotal = _products.reduce((sum, { price, count }) => sum + price * count, 0)

    dispatch(Actions.setData({ ...data, total: newTotal, products: _products }))
  }

  const handleEdit = (id, field, value) => {
    var _products = [...data.products]
    var index = _products.findIndex((p) => p.id === id)

    _products[index] = { ..._products[index], [field]: value }
    const newTotal = _products.reduce((sum, { price, count }) => sum + price * count, 0)

    dispatch(Actions.setData({ ...data, total: newTotal, products: _products }))
  }

  const handleEditPrice = (id, values) => {
    var _products = [...data.products]
    var index = _products.findIndex((p) => p.id === id)

    _products[index] = { ..._products[index], formattedBasePrice: values.formattedValue, price: parseFloat(values.value) }
    const newTotal = _products.reduce((sum, { price, count }) => sum + price * count, 0)

    dispatch(Actions.setData({ ...data, total: newTotal, products: _products }))
  }

  const getBase64 = (e) => {
    var file = e.target.files[0]
    let reader = new FileReader()

    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file)
      reader.onload = () => {
        dispatch(Actions.setEmmiter({ ...emmiter, logo: reader.result }))
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
  }

  const buildMessage = () => {
    // const message = `A ${
    //   emmiter.name ?? '[NOME DA EMPRESA/FISICA]'
    // }, inscrita no CNPJ/MF sob nº 21.227.107/0001-47, com sede e foro na Avenida Conselheiro Aguiar, 2966, Boa Viagem, Recife, neste ato presentada na Forma de seu contrato social e de outro lado o contratante denominado de “CLIENTE”, resolvem celebrar o presente contrato de venda, nas condições acima.`

    const first = `A ${emmiter.name ?? '[NOME EMPRESA/FORNECEDOR]'}`
    const third = `, neste ato apresentada na Forma de seu contrato social e de outro lado o denominado de “CLIENTE”, resolvem celebrar o presente contrato de venda, nas condições acima.`

    return first + third
  }
  const classes = useStyles()
  const inputRef = React.useRef(null)

  return (
    <Container id="huw">
      <Top>
        <div id="company">
          <input ref={inputRef} type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => getBase64(e)} />
          <Tooltip title="LOGO">
            <Avatar
              id="logo"
              src={emmiter.logo}
              onClick={() => {
                inputRef.current.click()
              }}
            >
              LOGO
            </Avatar>
          </Tooltip>
          <div id="logoTitle">
            <Tooltip title="Prompt Text">
              <StyledContentEditable
                html={emmiter.name}
                placeholder={'[NOME DA EMPRESA]'}
                tagName="h1"
                upper
                disabled={false}
                onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, name: event.target.value }))}
                onFocus={() => handleFocus()}
              />
            </Tooltip>
            <StyledContentEditable
              html={emmiter.site}
              placeholder={'[NOME DO SITE]'}
              tagName="h4"
              disabled={false}
              onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, site: event.target.value }))}
              onFocus={() => handleFocus()}
            />
          </div>
        </div>
        <div id="client">
          <div id="period">
            <h1>RECIBO</h1>
            <StyledContentEditable
              html={data.number && '#' + data.number}
              placeholder={'#000000'}
              tagName="h4"
              disabled={false}
              onChange={(event) => dispatch(Actions.setData({ ...data, number: event.target.value.replace(/\D/g, '') }))}
              onFocus={() => handleFocus()}
              maxlength="4"
            />
            {/* <StyledContentEditable
              html={data.date}
              placeholder={moment(data.date).format('DD/MM/YYYY')}
              tagName="h4"
              disabled={false}
              onChange={(event) => dispatch(Actions.setData({ ...data, date: event.target.value }))}
              onFocus={() => handleFocus()}
            /> */}
            <StyledDatePicker defaultValue={moment('01/01/2020', 'DD/MM/YYYY')} format={'DD/MM/YYYY'} />
          </div>
          <div id="details">
            <div>
              <div id="add">
                <StyledContentEditable
                  html={receiver.address.city}
                  placeholder={'[CIDADE]'}
                  tagName="h5"
                  upper
                  disabled={false}
                  onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, address: { ...receiver.address, city: event.target.value } }))}
                  onFocus={() => handleFocus()}
                />
                <span>,&nbsp;</span>
                <StyledContentEditable
                  html={receiver.address.state}
                  placeholder={'[UF]'}
                  tagName="h5"
                  upper
                  disabled={false}
                  onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, address: { ...receiver.address, state: event.target.value } }))}
                  onFocus={() => handleFocus()}
                />
              </div>
              <StyledContentEditable
                html={receiver.name}
                placeholder={'[NOME DO CLIENTE]'}
                tagName="h2"
                upper
                disabled={false}
                onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, name: event.target.value }))}
                onFocus={() => handleFocus()}
              />
              <StyledContentEditable
                html={receiver.document.number}
                placeholder={'[DOCUMENTO CPF/CNPJ/RG]'}
                tagName="h5"
                upper
                disabled={false}
                onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, document: { ...receiver.document, number: event.target.value } }))}
                onFocus={() => handleFocus()}
              />
              <StyledContentEditable
                html={receiver.phone}
                placeholder={'[TELEFONE]'}
                tagName="h5"
                upper
                disabled={false}
                onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, phone: event.target.value }))}
                onFocus={() => handleFocus()}
              />
              <StyledContentEditable
                html={receiver.email}
                placeholder={'[EMAIL]'}
                tagName="h5"
                disabled={false}
                onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, email: event.target.value }))}
                onFocus={() => handleFocus()}
              />
            </div>
          </div>
        </div>
      </Top>
      <Middle>
        <TableContainer>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {showButtons && (
                  <StyledTableCell className={classes.input} align="center">
                    #
                  </StyledTableCell>
                )}
                <StyledTableCell className={classes.desc}>Descrição</StyledTableCell>
                <StyledTableCell className={classes.code} align="right">
                  Código
                </StyledTableCell>
                <StyledTableCell className={classes.count} align="right">
                  Qtd.
                </StyledTableCell>
                <StyledTableCell className={classes.price} align="right">
                  Valor
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.products?.length > 0 &&
                data?.products.map((row) => (
                  <StyledTableRow key={row.id}>
                    {showButtons && (
                      <StyledTableCell className={classes.input} component="th" scope="row">
                        <RoundButton onClick={() => handleRemove(row.id)} size={15} icon={FaMinus} />
                      </StyledTableCell>
                    )}
                    <StyledTableCell className={classes.desc} component="th" scope="row">
                      <StyledContentEditable
                        html={row.name}
                        placeholder={'[PRODUTO]'}
                        tagName="strong"
                        upper
                        disabled={false}
                        onChange={(event) => handleEdit(row.id, 'name', event.target.value)}
                        onFocus={() => handleFocus()}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={classes.code} align="right">
                      <StyledContentEditable
                        html={row.code}
                        placeholder={'[CÓDIGO]'}
                        tagName="strong"
                        upper
                        disabled={false}
                        onChange={(event) => handleEdit(row.id, 'code', event.target.value)}
                        onFocus={() => handleFocus()}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={classes.count} align="right">
                      <StyledContentEditable
                        html={row.count}
                        placeholder={'[QTD]'}
                        tagName="strong"
                        disabled={false}
                        onChange={(event) => handleEdit(row.id, 'count', event.target.value.replace(/\D/g, ''))}
                        onFocus={() => handleFocus()}
                      />
                    </StyledTableCell>

                    <StyledTableCell className={classes.price} align="right">
                      <CurrencyFormat
                        autoComplete="nope"
                        id="currency"
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={'R$'}
                        value={row.formattedBasePrice}
                        onValueChange={(values) => handleEditPrice(row.id, values)}
                        // onValueChange={(values) => setData({ ...data, formPrice: values.formattedValue, formBasePrice: parseFloat(values.value) })}
                        autoComplete="nope"
                        onFocus={() => handleFocus()}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              <StyledTableRow>
                <StyledTableCell rowSpan={1}>{showButtons && <RoundButton onClick={() => handleAdd()} size={15} icon={FaPlus} />}</StyledTableCell>
                <StyledTableCell align="right" rowSpan={1} colSpan={3}>
                  Subtotal
                </StyledTableCell>
                <StyledTableCell rowSpan={1} align="right">
                  <CurrencyFormat
                    value={data?.total}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'R$'}
                  />
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div id="signature">
          <p>___________________________________________________________________</p>
          <p>Assinatura</p>
        </div> */}
      </Middle>
      <Bottom>
        <StyledContentEditable
          id="message"
          html={buildMessage()}
          tagName="h5"
          disabled={false}
          onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, message: event.target.value }))}
          onFocus={() => handleFocus()}
        />
        <Separator />
        <div id="info">
          <div>
            <StyledContentEditable
              html={emmiter.site}
              placeholder={'[SITE DA EMPRESA]'}
              tagName="strong"
              disabled={false}
              onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, site: event.target.value }))}
              onFocus={() => handleFocus()}
            />
            <StyledContentEditable
              html={emmiter.email}
              placeholder={'[EMAIL DA EMPRESA]'}
              tagName="h5"
              disabled={false}
              onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, email: event.target.value }))}
              onFocus={() => handleFocus()}
            />
            <StyledContentEditable
              html={emmiter.document.number}
              placeholder={'[DOCUMENTO DA EMPRESA]'}
              tagName="h5"
              disabled={false}
              onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, document: { ...emmiter.document, number: event.target.value } }))}
              onFocus={() => handleFocus()}
            />
          </div>
          <div>
            <div id="address">
              <StyledContentEditable
                html={emmiter?.address.address}
                placeholder={'[RUA]'}
                tagName="span"
                disabled={false}
                onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, address: { ...emmiter.address, address: event.target.value } }))}
                onFocus={() => handleFocus()}
              />
              <span>,&nbsp;</span>
              <StyledContentEditable
                html={emmiter.address.number}
                placeholder={'[NÚMERO]'}
                tagName="span"
                disabled={false}
                onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, address: { ...emmiter.address, number: event.target.value } }))}
                onFocus={() => handleFocus()}
              />
              <span>,&nbsp;</span>
              <StyledContentEditable
                html={emmiter.address.district}
                placeholder={'[BAIRRO]'}
                tagName="span"
                disabled={false}
                onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, address: { ...emmiter.address, district: event.target.value } }))}
                onFocus={() => handleFocus()}
              />
            </div>
            <div id="citystate">
              <StyledContentEditable
                html={emmiter.address.city}
                placeholder={'[CIDADE]'}
                tagName="h5"
                disabled={false}
                onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, address: { ...emmiter.address, city: event.target.value } }))}
                onFocus={() => handleFocus()}
              />
              <span>,&nbsp;</span>
              <StyledContentEditable
                html={emmiter.address.state}
                placeholder={'[UF]'}
                tagName="h5"
                disabled={false}
                onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, address: { ...emmiter.address, state: event.target.value } }))}
                onFocus={() => handleFocus()}
              />
            </div>
            <StyledContentEditable
              html={emmiter.phone}
              placeholder={'[TELEFONE DA EMPRESA]'}
              tagName="h5"
              disabled={false}
              onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, phone: event.target.value }))}
              onFocus={() => handleFocus()}
            />
          </div>
        </div>
      </Bottom>
    </Container>
  )
}

export default NewMatModel
