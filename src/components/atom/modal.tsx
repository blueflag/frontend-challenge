import React from 'react'
import { Modal as BsModal } from 'react-bootstrap'

const Modal: React.FC<Props> = ({ className, show, handleClose, size, title, children }: Props) => {

  return (
    <div>
      <BsModal className={className} onClose={handleClose} size={size} show={show} onHide={handleClose}>
        <BsModal.Header className="border-none" closeButton>
          <div className="fw-700">{title}</div>
        </BsModal.Header>
        <BsModal.Body className="px-0 pt-0">{children}</BsModal.Body>
      </BsModal>
    </div>
  )
}

interface Props {
  className?: string
	show: boolean
	handleClose: () => void
	handleShow: () => void
	size?: "sm" | "lg" | "xl"
	title?: string
	children: React.ReactNode 
}

Modal.defaultProps = {
	className: '',
}

export default Modal
