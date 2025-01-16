import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeeds } from '../../slices/feedSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const {
    orders,
    loading: feedsLoading,
    error: feedsError
  } = useSelector((state) => state.feed);

  const {
    items: ingredients,
    loading: ingredientsLoading,
    error: ingredientsError
  } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeeds());
    }
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, orders.length, ingredients.length]);

  const orderData = useMemo(
    () => orders.find((order) => order.number === Number(number)),
    [orders, number]
  );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (feedsLoading || ingredientsLoading) {
    return <Preloader />;
  }

  if (feedsError || ingredientsError) {
    return (
      <div className='error-message'>
        Ошибка загрузки данных: {feedsError || ingredientsError}
      </div>
    );
  }

  if (!orderInfo) {
    return <div className='error-message'>Заказ не найден.</div>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
