import React, { useState } from 'react';

type Props = {
  onClick: ()=> void;
};

const Button: React.FC<Props> = ({ onClick }) => (
  <button className="submit__button" type="submit" onClick={onClick}>
    Pay €55.00
  </button>
);

export default Button;
