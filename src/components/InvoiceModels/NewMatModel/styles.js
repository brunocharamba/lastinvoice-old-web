import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ContentEditable from 'react-contenteditable'

import { colors } from '../../../styles'

const Container = styled.div`
  /* @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap'); */
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 1008px;
  width: 720px;
  max-width: 720px;

  margin: 10px;
  border: 1px solid black;

  & * {
    /* font-family: 'Julius Sans One', sans-serif !important; */
    font-family: 'Montserrat', sans-serif;
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

      #add {
        display: flex;
        flex-direction: row;
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
  flex: 1;
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

  #currency {
    max-width: 100px;
    text-align: right;
    padding: 2px;
    border: none;
    background-color: rgba(0, 0, 0, 0);

    &:hover {
      background-color: ${colors.asbestos};
      border-radius: 5px;
      border: 1px solid ${colors.asbestos};
      margin: -1px;
    }
  }
`

const Bottom = styled.div`
  background-color: ${colors.clouds};

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
    height: 50px;

    & div {
      display: flex;
      flex-direction: column;
    }

    & > :nth-child(2) {
      align-items: flex-end;
    }

    #address,
    #citystate {
      display: flex;
      flex-direction: row;
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
    // backgroundColor: colors.midnightBlue,
    // color: theme.palette.common.white,

    color: colors.midnightBlue,
    border: 0,
    fontWeight: 600,
    fontSize: 16,
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
      border: 0,
    },
  },
}))(TableRow)

const StyledContentEditable = styled(ContentEditable)`
  box-sizing: border-box;
  padding: 2px;

  &:hover {
    background-color: ${colors.asbestos};
    border-radius: 5px;
    border: 1px solid ${colors.asbestos};
    margin: -1px;
  }

  &:focus {
    background-color: ${colors.asbestos};
    border-radius: 5px;
    border: 1px solid ${colors.asbestos} !important;
    margin: -1px;
    outline-width: 0;
  }

  &:empty:before {
    content: attr(placeholder);
  }
`

export { Container, Top, Middle, Bottom, Separator, StyledTableCell, StyledTableRow, StyledContentEditable }
