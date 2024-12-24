import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { sendOrder, closeOrderModal } from '../../slices/orderSlice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useAppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  const { bun, ingredients = [] } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const { loading: orderRequest, modalData: orderModalData } = useSelector(
    (state: RootState) => state.order
  );

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient) =>
        sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(sendOrder(ingredientIds));
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
