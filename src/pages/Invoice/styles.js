import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { colors } from '../../styles'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 40px 0;
  background-color: ${colors.clouds};

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
  flex: 0.6;
  justify-content: center;
  width: 100%;
  margin: 0px;
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
`

const PreviewWrapper = styled.div`
  display: flex;
  flex: 0.4;
  justify-content: center;
  /* background-color: ${colors.carrot}; */
`

export { Container, SliderWrapper, ContentWrapper, FormWrapper, PreviewWrapper, Separator }
