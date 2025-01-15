import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { fetchFeeds } from '../../slices/feedSlice';
import { RootState, useAppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const { orders, loading, error } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка загрузки заказов: {error}</div>;
  }

  if (!orders.length) {
    return <div>Заказы отсутствуют.</div>;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
