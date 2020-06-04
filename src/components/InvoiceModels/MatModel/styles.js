import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { colors } from '../../../styles'

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 1008px;
  width: 720px;
  border: 1px solid black;
  margin: 10px;

  & * {
    font-family: 'Julius Sans One', sans-serif !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
  }
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: ${colors.clouds};

  & #company {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 30px 0;

    & #logo {
      height: 100px;
      width: 100px;
    }

    & #logoTitle {
      margin: 0 0 0 20px;
    }
  }

  #client {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 20px;
    background-color: ${colors.midnightBlue};
    color: white !important;

    & * {
      color: white;
    }

    #details {
      display: flex;
      flex-direction: row-reverse;
      border-right: 2px solid white;
      padding: 0 10px 0 0;

      & > div {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin: 0 10px;
        align-items: flex-end;
        justify-content: center;
      }

      h5 {
        color: ${colors.clouds};
      }
    }

    #period {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 10px 0 10px 10px;
      border-left: 2px solid white;
    }
  }
`

const Middle = styled.div`
  display: flex;
  flex: 0.7;
  flex-direction: column;
  align-items: center;
  background-color: white;

  #signature {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
  }
`

const Bottom = styled.div`
  background-color: ${colors.clouds};
  height: 20px;

  #message {
    text-align: justify;
    text-justify: inter-word;
    font-size: 10px;
    margin: 20px;
  }

  #info {
    margin: 20px;
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    font-size: 11px;

    & div {
      display: flex;
      flex-direction: column;
    }

    & > :nth-child(2) {
      align-items: flex-end;
    }
  }
`

const Separator = styled.hr`
  margin: 5px 20px;
`

const StyledTableCell = withStyles((theme) => ({
  root: {
    border: 0,
  },
  head: {
    backgroundColor: colors.midnightBlue,
    color: theme.palette.common.white,
    border: 0,
  },
  body: {
    fontSize: 14,
    border: 0,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

export { Container, Top, Middle, Bottom, Separator, StyledTableCell, StyledTableRow }
