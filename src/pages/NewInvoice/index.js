import React, { useRef } from 'react'

import ReactToPdf from 'react-to-pdf'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

import MatModel from '../../components/InvoiceModels/MatModel'
import HalfModel from '../../components/InvoiceModels/HalfModel'

import { Container } from './styles'

function NewInvoice() {
  const myRef = useRef()

  const handleSave = (e) => {
    e.preventDefault()

    // const input = document.getElementById('pdf-wrapper')
    console.log(myRef.current.offsetHeight, myRef.current.children[0], -window.scrollX)
    const input = myRef.current.children[0]

    // html2canvas(input, { scrollX: -window.scrollX - 200, scrollY: -window.scrollY, height: 1008, width: 720 }).then((canvas) => {
    html2canvas(input, { scrollY: -window.scrollY, scrollX: -8 }).then((canvas) => {
      // const imgData = canvas.toDataURL('image/png')
      const imgData = canvas.toDataURL()

      saveAs(imgData)

      // const pdf = new jsPDF({ format: 'letter', putOnlyUsedFonts: true })
      // pdf.addImage(imgData, 'PNG', 0, 0)
      // pdf.save('download.pdf')
    })
  }

  return (
    <Container>
      <div ref={myRef}>
        <HalfModel></HalfModel>
      </div>
      <button onClick={(e) => handleSave(e)}>Gerar</button>
    </Container>
  )
}

export default NewInvoice
