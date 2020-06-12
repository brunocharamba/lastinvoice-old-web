import styled from 'styled-components'
import { colors } from '../../../styles'

const Container = styled.div`
  /* @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap'); */
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
  display: flex;
  flex: 1;
  flex-direction: row;
  min-height: 1400px;
  width: 1000px;
  max-width: 1000px;
  margin: 10px;
  border: 1px solid black;

  & * {
    /* font-family: 'Julius Sans One', sans-serif !important; */
    font-family: 'Rubik', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
  }
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 280px;
  padding: 20px;
  background-color: #20638f;

  #logo,
  #photo {
    display: flex;
    border-radius: 50px;
    width: 100px;
    height: 100px;
    background-color: ${colors.midnightBlue};
    color: ${colors.clouds};
    justify-content: center;
    align-items: center;
  }

  #title {
    text-align: center;
    text-transform: uppercase;
    font-size: 26px;
    margin: 20px 0 0 0;
    color: ${colors.clouds};
  }

  #company {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    align-items: flex-end;
    justify-content: flex-start;
    margin: 20px 0 0 0;

    h5 {
      color: ${colors.clouds};
    }
  }
`

const Fill = styled.div`
  width: 20px;
  background-color: #2980b9;
`

const FillD = styled.div`
  width: 20px;
  background-color: #3498db;
`

const Data = styled.div`
  width: 680px;
  padding: 20px;
  background-color: white;
`

const HorizontalSeparator = styled.div`
  height: 2px;
  width: 50%;
  margin: 20px 0;
  background-color: ${colors.clouds};
`

export { Container, Information, Data, Fill, FillD, HorizontalSeparator }
