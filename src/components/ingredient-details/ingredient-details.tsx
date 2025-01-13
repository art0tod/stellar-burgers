import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';
import { fetchIngredients } from '../../slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { loading, items } = useSelector(
    (state: RootState) => state.ingredients
  );

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  // if (loading) {
  //   return <Preloader />;
  // }

  const ingredientData = items.find((ingredient) => ingredient._id === id);

  if (!ingredientData) {
    return <div>Ингредиент не найден. Проверьте правильность ссылки.</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
