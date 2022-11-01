const BookSearchModal = (props:any) => {
  const { closeModal } = props;
  return (
  <>
  <div className="container" onClick={closeModal}>

    <div className="modal">
      모달창입니다
    </div>

  </div>  
  <style jsx>{`
    .container {
      position: absolute;
      top: 0;
      left: 0;
      z-Index: 100;
      width: 100%;
      height: 250vh;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .modal {
      display: flex;
      flex-direction: column;
      margin: 10% auto;
      border-radius: 10px;
      background: white;
      width: 85%;
      height: 200vh;
      padding: 50px;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    }
    
    `}</style>
  </>);
}

export default BookSearchModal;