import React from "react";
import { tailspin } from "ldrs";

tailspin.register();

// Default values shown

const Loader = () => {
  return (
    <l-tailspin size="40" stroke="5" speed="0.9" color="pink"></l-tailspin>
  );
};

export default Loader;
