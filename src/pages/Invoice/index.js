import React from 'react'
import Slider from 'react-slick'

import { Container, SliderWrapper } from './styles'

function Invoice() {
  return (
    <Container>
      <h2>RECIBO DE PAGAMENTO</h2>
      <SliderWrapper>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={6}
          slidesToScroll={3}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
        </Slider>
      </SliderWrapper>
    </Container>
  )
}

export default Invoice
