import React, { useRef, useState } from 'react'
import { FaFileAlt, FaArrowDown, FaFont, FaBars } from 'react-icons/fa'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

import Header from '../../components/Header'
import NewMatModel from '../../components/InvoiceModels/NewMatModel'

import { Container, Menu, Button } from './styles'

function NewInvoice() {
  const myRef = useRef()

  const handleSave = (e) => {
    e.preventDefault()
    // const input = document.getElementById('pdf-wrapper')
    console.log(myRef.current.offsetHeight, myRef.current.children[0], -window.scrollX)
    const input = myRef.current.children[0]

    // html2canvas(input, { scrollX: -window.scrollX - 200, scrollY: -window.scrollY, height: 1008, width: 720 }).then((canvas) => {
    html2canvas(input, { scrollY: -window.scrollY, scrollX: -8, scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      // const imgData = canvas.toDataURL()

      // saveAs(imgData)

      const pdf = new jsPDF({ format: 'letter', putOnlyUsedFonts: true, compressPdf: true })
      pdf.addImage(imgData, 'PNG', 20, 20, 180, 252, '', 'FAST')
      pdf.save('download.pdf')
    })
  }

  return (
    <Container>
      <Header></Header>
      <Menu>
        <Button onClick={() => alert('test')}>
          <div>
            <FaFont size={30} />
          </div>
          {/* <span>MODELO</span> */}
        </Button>
        <Button onClick={() => alert('test')}>
          <div>
            <FaBars size={30} />
          </div>
          {/* <span>MODELO</span> */}
        </Button>
        <Button onClick={() => alert('test')}>
          <div>
            <FaFileAlt size={30} />
          </div>
          {/* <span>MODELO</span> */}
        </Button>
        <Button onClick={(e) => handleSave(e)}>
          <div>
            <FaArrowDown size={30} />
          </div>
          {/* <span>DOWNLOAD</span> */}
        </Button>
      </Menu>
      <div id="print-wrapper" ref={myRef}>
        <NewMatModel width="300px"></NewMatModel>
      </div>
    </Container>
  )
}

export default NewInvoice
