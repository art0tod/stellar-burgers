import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../services/store';
import { fetchUserOrders } from '../../slices/orderSlice';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();

  const { userOrders, loading, error } = useSelector(
    (state: RootState) => state.order
  );
  console.log({ userOrders, loading, error });

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
