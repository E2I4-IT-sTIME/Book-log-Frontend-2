export function brText(text: string) {
  return (
    <span>
      {text.split("\n").map((txt: String) => (
        <>
          {txt}
          <br />
        </>
      ))}
    </span>
  );
}
