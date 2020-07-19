import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaFileAlt, FaArrowDown, FaPrint } from 'react-icons/fa'
import Tooltip from '@material-ui/core/Tooltip'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Creators as Actions } from '../../store/ducks/invoice'

import Header from '../../components/Header'
import NewMatModel from '../../components/InvoiceModels/NewMatModel'
import HalfModel from '../../components/InvoiceModels/HalfModel'

import { Container, Menu, Button } from './styles'

function NewInvoice() {
  const [createPdf, setCreatePdf] = useState({ showButtons: true, toPrint: true })
  const emmiter = useSelector((state) => state.invoice.emmiter)

  const myRef = useRef()
  const dispatch = useDispatch()

  const handlePdf = (e, toPrint) => {
    e.preventDefault()
    dispatch(Actions.setEmmiter({ ...emmiter, name: ' ' }))
    setCreatePdf({ showButtons: false, toPrint })
  }

  useEffect(() => {
    if (!createPdf.showButtons) {
      const input = myRef.current.children[0]

      html2canvas(input, { scrollY: -window.scrollY, scrollX: -8, scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const marginLeft = 20
        const imgWidth = 180
        const pageHeight = 252
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        var heightLeft = imgHeight
        var position = 10

        // var link = document.createElement('a')
        // link.download = 'my-image.png'
        // link.href = imgData
        // link.click()

        const pdf = new jsPDF({ format: 'letter', putOnlyUsedFonts: true, compressPdf: true, pagesplit: true })

        pdf.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          // position += heightLeft - imgHeight // top padding for other pages
          position = heightLeft - imgHeight - marginLeft
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight, 'FAST')
          heightLeft -= pageHeight

          console.log(position)
        }

        // pdf.addImage(imgData, 'PNG', 20, 20, 180, 252, '', 'FAST')

        if (createPdf.toPrint) pdf.output('dataurlnewwindow')
        else pdf.save('invoice.pdf')

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
