import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useAppDispatch, RootState } from '../../services/store';
import { fetchUserOrders } from '../../slices/orderSlice';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();

  const { userOrders, loading, error } = useSelector(
    (state: RootState) => state.order
  );

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
