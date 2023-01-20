import { useRef, useEffect } from "react";

interface taProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function DefaultTextArea(props: taProps) {
  const { value, onChange, placeholder } = props;

  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };

  const onChangeHandler = (value: string) => {
    onChange(value);
    handleResizeHeight();
  };

  useEffect(() => {
    handleResizeHeight();
  }, []);

  return (
    <div className="container">
      <textarea
        className="custom-textarea"
        ref={textarea}
        onChange={(e) => onChangeHandler(e.target.value)}
        value={value}
        placeholder={placeholder}
        rows={1}
      />
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .custom-textarea {
          width: 100%;
          font-size: 14px;
          color: #242424;
          border-top: none;
          border-left: none;
          border-right: none;
          outline: none;
          padding: 5px;
          resize: none;
          overflow: hidden;
          font-family: "SUIT Variable", sans-serif;
          transition: all 0.25s;
          white-space: nowrap;
          word-break: keep-all;
          white-space: pre-line;
        }

        .custom-textarea:focus {
          border-bottom: 3px solid #125b50;
        }
      `}</style>
    </div>
  );
}
