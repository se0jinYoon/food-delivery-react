import classes from './Checkout.module.css';

const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
    
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">주소</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">우편 번호</label>
        <input type="text" id="postal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">상세 주소</label>
        <input type="text" id="city" />
      </div>
      <button type="button" onClick={props.onCancel}>
        취소하기
      </button>
      <button>확인</button>
    </form>
  );
};

export default Checkout;
