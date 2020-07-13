import React, { useState, useRef, useEffect } from 'react'
import { FaFileAlt, FaArrowDown, FaPrint } from 'react-icons/fa'
import Tooltip from '@material-ui/core/Tooltip'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import Header from '../../components/Header'
import NewMatModel from '../../components/InvoiceModels/NewMatModel'
import HalfModel from '../../components/InvoiceModels/HalfModel'

import { Container, Menu, Button } from './styles'

function NewInvoice() {
  const [createPdf, setCreatePdf] = useState({ showButtons: true, toPrint: true })
  const myRef = useRef()

  const handlePdf = (e, toPrint) => {
    e.preventDefault()
    setCreatePdf({ showButtons: false, toPrint })
  }

  useEffect(() => {
    if (!createPdf.showButtons) {
      const input = myRef.current.children[0]

      html2canvas(input, { scrollY: -window.scrollY, scrollX: -8, scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({ format: 'letter', putOnlyUsedFonts: true, compressPdf: true })
        pdf.addImage(imgData, 'PNG', 20, 20, 180, 252, '', 'FAST')

        if (createPdf.toPrint) pdf.output('dataurlnewwindow')
        else pdf.save('invoice.pdf')

        // pdf.output('dataurlnewwindow')

        setCreatePdf({ showButtons: true, toPrint: true })
      })
    }
  }, [createPdf])

  return (
    <Container>
      <Header></Header>
      <Menu>
        <Tooltip title="Imprimir" aria-label="print" placement="top">
          <Button onClick={(e) => handlePdf(e, true)}>
            <div>
              <FaPrint size={30} />
            </div>
          </Button>
        </Tooltip>
        <Tooltip title="Baixar" aria-label="download" placement="top">
          <Button onClick={(e) => handlePdf(e, false)}>
            <div>
              <FaArrowDown size={30} />
            </div>
          </Button>
        </Tooltip>
      </Menu>
      <div id="print-wrapper" ref={myRef}>
        <NewMatModel width="300px" showButtons={createPdf.showButtons}></NewMatModel>
        {/* <HalfModel width="300px" showButtons={createPdf.showButtons}></HalfModel> */}
      </div>
    </Container>
  )
}

export default NewInvoice
