import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    // useEffect 자체는 promise를 반환하지 못하므로 내부에 따로 함수를 정의하여 promise를 통한 fetch를 한다
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-ab392-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      // firebase에 객체로 저장된 값을 배열로 변환하는 작업
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      // 컴포넌트가 처음 렌더링 될 때 promise로 데이터를 받아오기 때문에 rerendering되도록 해야함
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // useEffect 자체는 promise를 반환하지 못함
    // 내부에 정의한 async-await함수에서 error를 반환하게 되면 promise 자체에 에러가 생김
    // 따라서 try-catch를 사용할 수 없음
    // promise를 반환할 경우 사용할 수 있는 .catch 메소드를 이용해서 에러 핸들링
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  // loading중일 시 return하는 부분
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
