import React, { useRef, useState } from 'react'
import { FaFileAlt, FaRegCreditCard, FaBriefcase, FaBars } from 'react-icons/fa'

import ReactToPdf from 'react-to-pdf'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

import Header from '../../components/Header'
import NewMatModel from '../../components/InvoiceModels/NewMatModel'
import HalfModel from '../../components/InvoiceModels/HalfModel'

import { Container, Menu, Button } from './styles'

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

      // saveAs(imgData)

      const pdf = new jsPDF({ format: 'letter', putOnlyUsedFonts: true })
      pdf.addImage(imgData, 'PNG', 20, 20, 160, 200)
      pdf.save('download.pdf')
    })
  }

  return (
    <Container>
      <Menu>
        <Button onClick={() => alert('test')}>
          <FaFileAlt></FaFileAlt> MODELO
        </Button>
        <Button onClick={() => alert('test')}>DOWNLOAD</Button>
      </Menu>
      <div id="print-wrapper" ref={myRef}>
        <NewMatModel></NewMatModel>
      </div>
      <button onClick={(e) => handleSave(e)}>Gerar</button>
    </Container>
  )
}

export default NewInvoice
