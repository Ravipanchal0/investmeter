import React from "react";
import Logo from "../assets/Logo.svg";

const Header = React.memo(() => {
  return (
    <header className="flex flex-col md:flex-row items-center md:items-start md:justify-between py-4 mb-4">
      <div className="log">
        <img src={Logo} alt="InvestMeter" width={75} loading="lazy" />
      </div>
      <div className="brand-name flex flex-col items-center md:items-end leading-4 mt-2">
        <h1 className="text-3xl uppercase font-golos">
          <span className="font-extrabold text-dark-blue">Invest</span>
          <span className="text-green-dark">Meter</span>
        </h1>
        <p className="items-center text-center md:items-end text-gray-500">
          See your investments grow before you invest.
        </p>
      </div>
    </header>
  );
});

export default Header;
