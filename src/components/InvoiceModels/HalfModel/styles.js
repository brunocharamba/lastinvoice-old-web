import styled from 'styled-components'

const Container = styled.div`
  /* @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap'); */
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 1310px;
  width: 936px;
  max-width: 936px;
  margin: 10px;
  background-color: green;
  padding: 20px;
  & * {
    /* font-family: 'Julius Sans One', sans-serif !important; */
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
  }
`

export { Container }
