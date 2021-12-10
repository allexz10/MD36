/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useRef } from 'react';
import dropdownData from '../../datas/DropdownData';
import Button from './Button';
import './Form.scss';

const Form = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Country');
  const [isError, setIsError] = useState(true);

  const input = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    input.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (inputName && inputEmail && cardNumber && cardDate && cardCvc && selected) {
      setInputName('');
      setInputEmail('');
      setCardCvc('');
      setCardNumber('');
      setCardDate('');
      setSelected('');
    }
  };

  return (
    <div className="form__section" onMouseEnter={() => setIsActive(false)}>
      <form className="form">
        <h1 className="form__title">Payment</h1>
        <div className="input__wrapper">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input input--email"
            ref={input}
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Email"
            type="email"
            id="email"
          />
        </div>
        <div className="input__wrapper">
          <label className="label" htmlFor="card">
            Card information
          </label>
          <div className="card__number--wrapper">
            <input
              className="input input--card-number"
              onChange={(e) => setCardNumber(e.target.value)}
              value={cardNumber}
              type="text"
              placeholder="0000 0000 0000 0000"
              name="card number"
              id="card"
            />
            <img
              className="mastercard"
              src="/Mastercard.svg"
              alt="mastercard"
            />
          </div>

          <div className="card__wrapper">
            <input
              className="input input--card-date"
              onChange={(e) => setCardDate(e.target.value)}
              value={cardDate}
              type="text"
              placeholder="MM/YY"
              name="card date"
            />
            <input
              className="input input--card-cvc"
              onChange={(e) => setCardCvc(e.target.value)}
              value={cardCvc}
              placeholder="CVC"
              name="card cvc"

            />
          </div>
        </div>
        <div className="input__wrapper">
          <label className="label" htmlFor="card__name">
            Name on card
          </label>
          <input
            className="input input--card-name"
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
            placeholder="Name"
            type="text"
            id="card__name"
          />
        </div>
        <div className="input__wrapper">
          <span
            className="label"
            onClick={() => {
              setIsActive(true);
              button.current?.focus();
            }}
          >
            Country or region
          </span>

          <div className="dropdown">
            <button
              className="dropdown__button"
              type="button"
              ref={button}
              onClick={() => setIsActive(!isActive)}
            >
              {selected}
            </button>
            <div
              className={isActive ? 'dropdown__list active' : 'dropdown__list'}
              aria-label="dropdown list"
            >
              {dropdownData.map(({ id, title }) => (
                <div
                  className="dropdown__list--item"
                  key={id}
                  onClick={() => {
                    setSelected(title);
                    setIsActive(false);
                    button.current?.focus();
                  }}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button onClick={() => handleSubmit} />
      </form>
    </div>
  );
};

export default Form;
