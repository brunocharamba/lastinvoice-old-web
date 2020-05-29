import styled from 'styled-components'
import { colors } from '../../styles'

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: ${colors.amethyst};
`

const Logo = styled.img`
  height: 50px;
`

export { Container, Logo }
