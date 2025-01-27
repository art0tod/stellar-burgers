import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';

import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { RootState } from '../../services/store';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading: isIngredientsLoading,
    error
  } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  if (error) {
    return (
      <div className='error-message'>Ошибка загрузки ингредиентов: {error}</div>
    );
  }

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
