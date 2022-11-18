interface propsType {
  onClick: () => void;
  color: string,
  text : string
}

const Button = (props: propsType) => {
  return(
    <>
    <button style={{backgroundColor: props.color}}>
      {props.text}
    </button>
    <style jsx>{`
      button {
        height: 62px;
        border: 0px;
        font-size: 24px;
        font-weight: bold;
        color: white;
        border-radius: 20px;
        width: 200px;
        cursor: pointer;
      }      
      `}</style>
    </>
  );
}

export default Button;