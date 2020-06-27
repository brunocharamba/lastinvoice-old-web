import styled from 'styled-components'
import { Drawer } from 'antd'

import { colors } from '../../styles'

const Container = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  padding: 20px 30px;
  z-index: 200;

  & * {
    z-index: 200;
  }

  a,
  a:hover {
    text-decoration: none;
  }

  & h1 {
    margin: 0;
    color: ${colors.clouds};
  }

  & div {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    margin: 5px 0 0 0;

    & h2,
    & h3 {
      margin: 0 0 0 40px;
      color: ${colors.clouds};
    }

    #signup,
    #login {
      padding: 10px;
      border: 1px solid ${colors.clouds};
      transition: 0.25s;

      &:hover {
        background-color: ${colors.lighterTransparent};
      }
    }
  }
`

const StyledDrawer = styled(Drawer)`
  position: absolute;

  & * {
    color: ${colors.clouds};
  }
  .ant-drawer-body,
  .ant-drawer-header {
    background-color: ${colors.darkerTransparent};
  }

  .ant-drawer-close {
    margin: 12px 0 0 0;
  }
`

export { Container, StyledDrawer }
