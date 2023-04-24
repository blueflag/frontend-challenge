import React, {useState} from 'react'
import Modal from './modal';

const ModalButton: React.FC<Props> = ({ 
  className, 
  children, 
  modalTitle, 
  isIcon, 
  icon, 
  iconClassName,
  btnChildren
}: Props) => {

  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        handleShow={() => setShow(true)}
        title={modalTitle}
      >
        {children}
      </Modal>
      <div className="cursor-pointer" onClick={()=> setShow(true)}>
        {btnChildren}
      </div>
    </div>
  )
}

interface Props {
  className?: string
  modalTitle?: string
  children: React.ReactNode 
  isIcon?: boolean
  icon?: string
  iconClassName?: string
  btnChildren?: React.ReactNode
}

ModalButton.defaultProps = {
	className: ''
}

export default ModalButton
