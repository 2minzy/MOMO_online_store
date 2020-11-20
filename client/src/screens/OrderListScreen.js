import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className='container'>
      <h3 className='admin__list__title'>ORDERS</h3>
      <div className='admin__list'>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className='error'>
            <Message>{error}</Message>
          </div>
        ) : (
          <table className='admin__list__table'>
            <thead>
              <tr>
                <th>NO.</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>$ {order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>

                    <td className='admin__list__btn'>
                      <Link to={`/order/${order._id}`}>
                        <button className='btn admin__list__edit'>
                          <i className='fas fa-arrow-right'></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderListScreen;
