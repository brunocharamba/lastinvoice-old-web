import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CurrencyFormat from 'react-currency-format'

import moment from 'moment'

import Paper from '@material-ui/core/Paper'

import { Container, Top, Middle, Bottom, Separator, StyledTableCell, StyledTableRow } from './styles'

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

function createData(name, code, count, price) {
  return { name, code, count, price }
}
const defaultRows = [createData('Produto 1', 'AD23A', 1, 398.99), createData('Produto 2', '87ZER', 1, 100.9), createData('Produto 3', 'ZMI1070', 1, 210.0)]

function MatModel({ emmiter, receiver, data, isPreview }) {
  const makeAddress = () => {
    let address = ''
    if (isPreview) {
      address += (emmiter?.address.address || '[RUA]') + ', '
      address += (emmiter?.address.number || '[NUMERO]') + ', '
      address += emmiter?.address.district || '[BAIRRO]'
    } else {
      address += emmiter?.address.address ? emmiter?.address.address + ', ' : ''
      address += emmiter?.address.number ? emmiter?.address.number + ', ' : ''
      address += emmiter?.address.district
    }

    return address
  }

  const classes = useStyles()
  return (
    <Container id="huw">
      <Top>
        <div id="company">
          <Avatar id="logo" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.pg">
            LOGO
          </Avatar>
          <div id="logoTitle">
            <h1>{emmiter?.name || (isPreview && '[NOME DA EMPRESA]')}</h1>
            <h4>{emmiter?.site || (isPreview && '[SITE]')}</h4>
          </div>
        </div>
        <div id="client">
          <div id="period">
            <h1>RECIBO</h1>
            <h4>{data?.number ? '#' + data?.number : '[#NUMERO]'}</h4>
            <h4>
              {data?.type || (isPreview && '[TIPO]')} | {moment(data?.date).format('DD/MM/YYYY') || (isPreview && '[DATA]')}
            </h4>
          </div>
          <div id="details">
            <AccountCircleIcon style={{ fontSize: 80 }} />
            <div>
              <h5>
                {receiver?.address.city || (isPreview && '[CIDADE]')} {receiver?.address.state || (isPreview && '[UF]')}
              </h5>
              <h2>{receiver?.name || (isPreview && '[CIDADE]')}</h2>
              <h5>{receiver?.document.number || (isPreview && '[DOCUMENTO]')}</h5>
              <h5>{receiver?.phone || (isPreview && '[TELEFONE]')}</h5>
              <h5>{receiver?.email || (isPreview && '[EMAIL]')}</h5>
            </div>
          </div>
        </div>
      </Top>
      <Middle>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Descrição</StyledTableCell>
                <StyledTableCell align="right">Código</StyledTableCell>
                <StyledTableCell align="right">Quantidade</StyledTableCell>
                <StyledTableCell align="right">Valor</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.products?.length > 0 &&
                data?.products.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.code}</StyledTableCell>
                    <StyledTableCell align="right">{row.count}</StyledTableCell>
                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                  </StyledTableRow>
                ))}
              <StyledTableRow>
                <StyledTableCell rowSpan={4} />
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
        <div id="message">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet, leo nec eleifend posuere, sem tortor imperdiet turpis, eget mollis sapien
          nulla at mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        </div>
        <Separator />
        <div id="info">
          <div>
            <strong>{emmiter?.site || (isPreview && '[SITE]')}</strong>
            <div>{emmiter?.email || (isPreview && '[EMAIL]')}</div>
            <div>{emmiter?.document.number || (isPreview && '[DOCUMENTO]')}</div>
          </div>
          <div>
            <div>
              {makeAddress()}
              {/* {emmiter.address.address || '[RUA]'}, {emmiter.address.number || '[NUMERO]'}, {emmiter.address.district || '[BAIRRO]'} */}
            </div>
            <div>
              {emmiter?.address.city || '[CIDADE]'}, {emmiter?.address.state || '[UF]'}
            </div>
            <div>{emmiter?.phone || '[PHONE]'}</div>
          </div>
        </div>
      </Bottom>
    </Container>
  )
}

export default MatModel
