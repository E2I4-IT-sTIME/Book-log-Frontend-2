import BookSearch from "./BookSearch";

const BookReviewForm = () => {
  return(
    <>
    <div className="container">
     <BookSearch />
    </div>
    <style jsx>{`
      .container{
        display: flex;
        flex-direction: row;
        border-radius: 10px;
        width: fit-content;
        padding: 50px;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
      }
      `} </style>
    </>
  );
}

export default BookReviewForm;