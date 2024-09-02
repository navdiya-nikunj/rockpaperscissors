const Button = ({
  text,
  handler,
  classname,
}: {
  text: string;
  handler: () => void;
  classname: string;
}) => {
  return (
    <div
      className={`p-3 bg-[url('/woodplate.png')] flex justify-center content-center h-fit w-fit bg-cover bg-no-repeat ${classname}`}
    >
      <p className=" font-nerko font-bold e text-3xl italic text-black">
        <button onClick={handler}>{text}</button>
      </p>
    </div>
  );
};

export default Button;
