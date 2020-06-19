import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CurrencyFormat from 'react-currency-format'
import { Creators as Actions } from '../../../store/ducks/invoice'

import moment from 'moment'

import Paper from '@material-ui/core/Paper'

import {
  Container,
  Top,
  Middle,
  Bottom,
  Separator,
  StyledTableCell,
  StyledTableRow,
  StyledContentEditable,
  MyTable,
  MyTableHeaderRow,
  MyTableRow,
  MyTableCell,
} from './styles'

const useStyles = makeStyles({
  table: { minWidth: 700 },
  desc: { width: 290, maxWidth: 290 },
  code: { width: 120, maxWidth: 120 },
  count: { width: 50, maxWidth: 50 },
  price: { width: 100, maxWidth: 100 },
})

function createData(name, code, count, price) {
  return { name, code, count, price }
}
const defaultRows = [createData('Produto 1', 'AD23A', 1, 398.99), createData('Produto 2', '87ZER', 1, 100.9), createData('Produto 3', 'ZMI1070', 1, 210.0)]

function NewMatModel({ isPreview }) {
  const emmiter = useSelector((state) => state.invoice.emmiter)
  const receiver = useSelector((state) => state.invoice.receiver)
  const data = useSelector((state) => state.invoice.data)
  const dispatch = useDispatch()

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

  const handleEdit = (id, field, value) => {
    var _products = [...data.products]
    var index = _products.findIndex((p) => p.id === id)

    console.log(id, field, value)

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

  const classes = useStyles()
  return (
    <Container id="huw">
      <button onClick={() => console.log(data)}>Test</button>
      <Top>
        <div id="company">
          <Avatar id="logo" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.pg">
            LOGO
          </Avatar>
          <div id="logoTitle">
            <StyledContentEditable
              html={emmiter.name}
              placeholder={'[NOME DA EMPRESA]'}
              tagName="h1"
              disabled={false}
              onChange={(event) => dispatch(Actions.setEmmiter({ ...emmiter, name: event.target.value }))}
              onFocus={() => handleFocus()}
            />
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
            <br />
            <StyledContentEditable
              html={data.date}
              placeholder={moment(data.date).format('DD/MM/YYYY')}
              tagName="h4"
              disabled={false}
              onChange={(event) => dispatch(Actions.setData({ ...data, date: event.target.value }))}
              onFocus={() => handleFocus()}
            />
          </div>
          <div id="details">
            <AccountCircleIcon style={{ fontSize: 80 }} />
            <div>
              <div id="add">
                <StyledContentEditable
                  html={receiver.address.city}
                  placeholder={'[CIDADE]'}
                  tagName="h5"
                  disabled={false}
                  onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, address: { ...receiver.address, city: event.target.value } }))}
                  onFocus={() => handleFocus()}
                />
                <span>,&nbsp;</span>
                <StyledContentEditable
                  html={receiver.address.state}
                  placeholder={'[UF]'}
                  tagName="h5"
                  disabled={false}
                  onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, address: { ...receiver.address, state: event.target.value } }))}
                  onFocus={() => handleFocus()}
                />
              </div>
              <StyledContentEditable
                html={receiver.name}
                placeholder={'[NOME DO CLIENTE]'}
                tagName="h2"
                disabled={false}
                onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, name: event.target.value }))}
                onFocus={() => handleFocus()}
              />
              <StyledContentEditable
                html={receiver.document.number}
                placeholder={'[DOCUMENTO CPF/CNPJ/RG]'}
                tagName="h5"
                disabled={false}
                onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, document: { ...receiver.document, number: event.target.value } }))}
                onFocus={() => handleFocus()}
              />
              <StyledContentEditable
                html={receiver.phone}
                placeholder={'[TELEFONE]'}
                tagName="h5"
                disabled={false}
                onChange={(event) => dispatch(Actions.setReceiver({ ...receiver, phone: event.target.value }))}
                onFocus={() => handleFocus()}
              />
              {/* <h5>{receiver?.email || (isPreview && '[EMAIL]')}</h5> */}
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
                    <StyledTableCell className={classes.desc} component="th" scope="row">
                      <StyledContentEditable
                        html={row.name}
                        placeholder={'[PRODUTO]'}
                        tagName="strong"
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
                    {/* <StyledTableCell align="right">
                      <StyledContentEditable
                        html={row.price}
                        placeholder={'[VALOR]'}
                        tagName="strong"
                        disabled={false}
                        onChange={(event) => handleEdit(row.id, 'price', event.target.value)}
                        onFocus={() => handleFocus()}
                      />
                    </StyledTableCell> */}
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
                <StyledTableCell rowSpan={4}>
                  <a onClick={() => handleAdd()}>Adicionar</a>
                </StyledTableCell>
                <StyledTableCell align="right" colSpan={2}>
                  Subtotal
                </StyledTableCell>
                <StyledTableCell align="right">
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
        <div id="signature">
          <p>___________________________________________________________________</p>
          <p>Assinatura</p>
        </div>
      </Middle>
      <Bottom>
        <StyledContentEditable
          id="message"
          html={emmiter.message}
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
