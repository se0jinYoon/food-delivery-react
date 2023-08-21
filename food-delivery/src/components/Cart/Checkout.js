import { useState, useRef } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postal: enteredPostalIsValid
    });
  
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

    if (!formIsValid) {
        return;
    } 

    // 데이터 전송
};

const nameControlClasses = `${classes.control} ${formInputsValidity.name? '' : classes.invalid}`
const streetControlClasses = `${classes.control} ${formInputsValidity.street? '' : classes.invalid}`
const postalControlClasses = `${classes.control} ${formInputsValidity.postal? '' : classes.invalid}`
const cityControlClasses = `${classes.control} ${formInputsValidity.city? '' : classes.invalid}`


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formInputsValidity.name && <p>이름을 입력하세요</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">주소</label>
        <input type="text" id="street" ref={streetInputRef}/>
        {!formInputsValidity.street && <p>주소를 입력하세요</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">우편 번호</label>
        <input type="text" id="postal" ref={postalInputRef}/>
        {!formInputsValidity.postal && <p>우편번호 5자리를 입력하세요</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">상세 주소</label>
        <input type="text" id="city" ref={cityInputRef}/>
        {!formInputsValidity.city && <p>상세주소를 입력하세요</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          취소하기
        </button>
        <button className={classes.submit}>확인</button>
      </div>
    </form>
  );
};

export default Checkout;
