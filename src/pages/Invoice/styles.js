import styled from 'styled-components'
import { colors } from '../../styles'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100% - 20px);
  background-color: ${colors.clouds};

  & > h2 {
    padding: 0 40px;
    color: ${colors.amethyst};
  }
`

const SliderWrapper = styled.div`
  margin: 0px 60px;
  /* width: 600px; */
`

export { Container, SliderWrapper }
