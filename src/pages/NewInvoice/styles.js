import styled, { keyframes } from 'styled-components'
import { isMobile } from 'react-device-detect'
import { fadeIn } from 'react-animations'

import { colors } from '../../styles'

const animation = keyframes`${fadeIn}`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: linear-gradient(to top, ${colors.asbestos}, ${colors.wetAsphalt});
  min-width: ${isMobile && '740px'};
  max-width: ${isMobile && '740px'};

  & #print-wrapper {
    padding: 10px;
    margin: 20px 0;
    background-color: ${colors.clouds};
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.8);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.8);

    animation: 1.5s ${animation};
    opacity: 1 !important;
  }
`

const Menu = styled.div`
  margin: 20px -50px 0 0;
  /* max-width: 720px;
  min-width: 720px; */
  min-width: ${!isMobile ? '720px' : 720 + 'px'};
  max-width: ${!isMobile ? '720px' : 720 + 'px'};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`

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

  & span {
    max-width: auto;
    margin: 0 8px;
    transition: 0.25s;
  }

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
    transform: scale(1.25);
  }

  &:hover div {
    color: ${colors.belizeHole};
  }
`

export { Container, Menu, Button }
