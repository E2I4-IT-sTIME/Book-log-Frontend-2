import { useEffect, useState } from 'react';
import { bookImgSearch } from './fetchBook';

const ThumnailCard = (props: any) => {
  const [bookImgSrc, setBookImgSrc] = useState('');

  const srcHandler = async () => {
    setBookImgSrc((await bookImgSearch(props.isbn)) || '');
  };

  useEffect(() => {
    srcHandler();
  }, []);

  return (
    <img
      className="hi"
      src={bookImgSrc || '/tmp.jpg'}
      style={{
        width: 40,
        height: 60,
        borderRadius: 10,
        objectFit: 'fill',
        marginLeft: -20,
        zIndex: `${3 - props.idx}`,
      }}
    />
  );
};

export default ThumnailCard;
