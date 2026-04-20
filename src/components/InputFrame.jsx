const InputFrame = ({
  name,
  label,
  min,
  max,
  step,
  symbol,
  value,
  onSetValue,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onSetValue((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="w-full">
      <div className="left flex justify-between">
        <p className="">{label}</p>

        <div className="px-2 pl-3 py-1 w-30 md:w-40 bg-green-light-1 flex items-center justify-between">
          <p className="font-semibold text-green-dark text-lg">{symbol}</p>
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            name={name}
            onChange={handleChange}
            className="w-full outline-none text-right text-green-text font-medium tracking-wide [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        id="slider"
        value={value}
        name={name}
        onChange={(e) => {
          onSetValue((prev) => ({
            ...prev,
            [e.target.name]: Number(e.target.value),
          }));
        }}
        className="w-full h-2 mt-4 accent-green-light bg-gray-300 rounded-full outline-0"
      />
      <div className="flex justify-between items-center text-gray-400 text-xs my-0.5">
        <p className="flex items-center gap-0.5">
          {symbol}
          {min}
        </p>
        <p className="flex items-center gap-0.5">
          {symbol}
          {max}
        </p>
      </div>
    </div>
  );
};

export default InputFrame;
