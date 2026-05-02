const Button = ({ Icon, label, btnType, onSetInvestType }) => {
  return (
    <button
      onClick={() =>
        onSetInvestType((prev) => ({
          ...prev,
          investType: label,
        }))
      }
      className={`${label === btnType && "active"} px-4 py-1.5 sm:px-5 sm:py-2 flex-center gap-2 rounded-md font-semibold text-ui-btn-title bg-ui-btn-bg text-sm cursor-pointer hover:bg-ui-btn-bg-hover hover:text-ui-btn-text-hover`}
    >
      <Icon className="size-4" />
      <span className="uppercase">{label}</span>
    </button>
  );
};

export default Button;
