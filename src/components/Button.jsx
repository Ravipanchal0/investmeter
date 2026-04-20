import React from "react";

const Button = React.memo(({ type, investDetail, setInvestDetail }) => {
  return (
    <button
      onClick={() =>
        setInvestDetail((prev) => ({
          ...prev,
          investType: type,
        }))
      }
      className={`${investDetail.investType == type && "active"} px-4 py-1.5 rounded text-dark-blue bg-slate-50 font-semibold hover:bg-green-200 hover:text-green-800 cursor-pointer uppercase transition-all duration-200 ease-in-out`}
    >
      {type.toUpperCase()}
    </button>
  );
});

export default Button;
