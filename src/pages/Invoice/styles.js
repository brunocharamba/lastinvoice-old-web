import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { colors } from '../../styles'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 40px 0;

  & > h2 {
    padding: 0 40px;
    color: ${colors.amethyst};
  }

  & select {
    position: relative;
    width: ${isMobile ? '100%' : '50%'} !important;
    height: 30px;
    background-color: white;
    z-index: 2;
    border: 1px solid ${colors.silver};
    -webkit-appearance: none;
    -webkit-border-radius: 0px;
    font-size: 14px;
    padding: 0 10px;
  }

  input:required {
    border: 1px solid ${colors.turquoise};
    outline: none;
  }
`

const Separator = styled.div`
  margin: 5px 0;
`

const SliderWrapper = styled.div`
  margin: 0px 60px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: ${isMobile ? 'column' : 'row'};
  margin: 60px 0 0 0;
  height: calc(100% - 60px);
`

const FormWrapper = styled.div`
  display: flex;
  flex: 0.45;
  justify-content: center;
  width: 100%;
  margin: 20px 0px;
  padding: 0px;

  & #formCard {
    margin: 0px;
  }

  & #buttons {
    display: flex;
    flex: 1;
    justify-content: space-around;
  }

  & *:focus {
    outline: none;
  }

  #type,
  #date {
    width: 100%;
    position: relative;
    border: 1px solid ${colors.clouds};
    border-radius: 5px;

    #sel,
    #text-date {
      padding: 8px 10px;
      border: 0;
      color: ${(props) => props.disabled && colors.silver};
    }
  }

  #num-receipt {
    text-transform: uppercase;
  }

  #currency {
    border: 2px solid ${colors.turquoise};
    padding: 0 10px;
  }

  #list {
    margin: 10px 0 0 0;
    padding: 10px;
    background-color: ${colors.clouds};
    border-radius: 5px;
  }
`

const PreviewWrapper = styled.div`
  display: flex;
  flex: 0.55;
  justify-content: center;
  margin: 20px 0;
  & #wp {
    transform: ${isMobile ? 'scale(0.43)' : 'scale(0.65)'};
    height: 0;
    top: 0;
  }
`

const ProductWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;

  & > span {
    width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export { Container, SliderWrapper, ContentWrapper, FormWrapper, PreviewWrapper, Separator, ProductWrapper }
