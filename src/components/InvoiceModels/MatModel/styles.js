import styled from 'styled-components'
import { colors } from '../../../styles'

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 1008px;
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
  flex: 0.3;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: ${colors.clouds};

  & #company {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 10% 0;

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
    flex: 1;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    background-color: ${colors.midnightBlue};
    color: white !important;

    & * {
      color: white;
    }

    #details {
      display: flex;
      flex-direction: row-reverse;

      & > div {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin: 0 10px;
        align-items: flex-end;
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
    }
  }
`

const Middle = styled.div`
  flex: 0.5;
  background-color: white;
`

const Bottom = styled.div`
  flex: 0.2;
  background-color: ${colors.clouds};
`

export { Container, Top, Middle, Bottom }
