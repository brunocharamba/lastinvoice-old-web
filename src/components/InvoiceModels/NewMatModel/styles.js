import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ContentEditable from 'react-contenteditable'
import { DatePicker } from 'antd'
// import { fadeIn } from 'react-animations'

import { colors } from '../../../styles'

// const animation = keyframes`${fadeIn}`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 1008px;
  width: 720px;
  max-width: 720px;

  margin: 10px;
  border: 1px solid black;

  & * {
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

      &:hover {
        cursor: pointer;
      }
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
    margin: 0 0 0 -15px;
    padding: 2px;
    border: none;
    background-color: rgba(0, 0, 0, 0);

    &:hover {
      background-color: ${colors.asbestos};
      border-radius: 5px;
      border: 1px solid ${colors.asbestos};
      margin: -1px;
      opacity: 1;
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
  text-transform: ${(props) => props.upper && 'uppercase'};

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

const StyledDatePicker = styled(DatePicker)`
  background-color: ${colors.midnightBlue};
  box-sizing: border-box;
  border: 0;

  &:hover {
    background-color: ${colors.asbestos};
    border-radius: 5px;
  }

  &:focus {
    background-color: ${colors.asbestos};
    border-radius: 5px;
    border: 1px solid ${colors.asbestos} !important;
    margin: -1px;
    outline-width: 0;
  }

  & * {
    color: ${colors.clouds} !important;
    /* background-color: ${colors.midnightBlue}; */
  }

  & input {
    margin: 0 -10px 0 -8px;
  }

  & span {
    display: none;
  }
`

export { Container, Top, Middle, Bottom, Separator, StyledTableCell, StyledTableRow, StyledContentEditable, StyledDatePicker }
