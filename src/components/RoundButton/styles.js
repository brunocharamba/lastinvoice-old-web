import styled from 'styled-components'
import { colors } from '../../styles'

const Button = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  margin: 0 5px;
  color: ${colors.clouds};
  background-color: ${colors.darkTransparent};
  border-radius: 50px;
  transform: scale(1);
  transition: 0.25s;
  width: ${(props) => props.size + 10 + 'px'} ;

  & div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > svg {
      /* background-color: ${colors.lightTransparent}; */
      background-color: ${colors.transparent};
      padding: 5px;
      border-radius: 50px;
    }
  }

  &:hover {
    text-decoration: none;
    background-color: ${colors.peterRiver};
    color: ${colors.clouds};
    transform: scale(1.15);
  }

  &:hover div {
    color: ${colors.belizeHole};
  }
`

export { Button }
