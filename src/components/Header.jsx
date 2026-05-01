import Logo from "../assets/Logo.svg";

const Header = () => {
  return (
    <header className="py-5">
      <h1 className="brand-name uppercase text-2xl font-roboto ">
        <span className="text-primary text-[#3e098f] font-bold">Invest</span>
        <span className="text-[#22c55e]">Meter</span>
      </h1>

      <p className="text-gray-500 font-inter text-sm leading-3">
        See your investments grow before you invest.
      </p>
    </header>
  );
};

export default Header;
