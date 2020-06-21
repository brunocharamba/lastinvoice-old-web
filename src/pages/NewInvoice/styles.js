import styled from 'styled-components'
import { colors } from '../../styles'

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  & #print-wrapper {
    padding: 10px;
    margin: 100px 0 0 0;
  }
`

const ModelWrapper = styled.div`
  border: 1px solid black;
`

const Menu = styled.div`
  position: absolute;
  top: 60px;
  height: 38px;

  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`

const Button = styled.a`
  height: 50px;
  padding: 20px;
  color: ${colors.clouds};
  background-color: ${colors.midnightBlue};

  &:hover {
    text-decoration: none;
  }
`

export { Container, ModelWrapper, Menu, Button }
