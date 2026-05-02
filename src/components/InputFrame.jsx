import { useState } from "react";

const InputFrame = ({
  name,
  Icon,
  label,
  desc,
  bgColor,
  textColor,
  min,
  max,
  step,
  value,
  onSetValue,
}) => {
  const sliderPercentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onSetValue((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3 mb-2">
        <div className="flex gap-2">
          <div
            className={`flex-center size-12 p-3.5 rounded-full ${bgColor}`}
            style={{ color: textColor }}
          >
            <Icon strokeWidth={3} />
          </div>
          <div>
            <label
              htmlFor={name}
              className="font-semibold text-sm text-slate-800"
            >
              {label}
            </label>
            <p className="text-xs text-gray-600">{desc}</p>
          </div>
        </div>
        <div
          className={`w-42 flex items-center self-end px-2 border border-input-border rounded-md`}
          style={{ color: textColor }}
        >
          <span>
            <Icon strokeWidth={2.5} />
          </span>
          <input
            id={name}
            type="number"
            name={name}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="w-full pl-1 py-1.5 outline-none font-semibold text-right tracking-wide"
          />
        </div>
      </div>
      <div>
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="input-slider w-full h-2 rounded-full appearance-none bg-ui-btn-title-active transition-all duration-300 cursor-grab active:cursor-grabbing"
          style={{
            "--thumb-color": textColor,
            background: `linear-gradient(to right, ${textColor} ${sliderPercentage}%, #e5e7eb ${sliderPercentage}%)`,
          }}
        />
      </div>
    </>
  );
};

export default InputFrame;
