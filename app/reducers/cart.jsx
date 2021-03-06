import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOAD_CART = 'LOAD_CART';
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const UPDATE_QTY = 'UPDATE_QTY'
const ORDER_STATUS_CHANGED = 'ORDER_STATUS_CHANGED'


/* ------------   ACTION CREATORS     ------------------ */


const loadCart = cartItems =>  ({type: LOAD_CART, cartItems})
const addItem = () => ({type: ADD_TO_CART})
const deleteItem = prodId => ({type: DELETE_CART_ITEM, prodId})
const updateQty = () => ({type: UPDATE_QTY})
const changeOrder = () => ({type: ORDER_STATUS_CHANGED})

/* ------------       REDUCERS     ------------------ */

const initialState = {}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {

    case LOAD_CART:
      newState.cartItems = action.cartItems;
      return newState;

    case ADD_TO_CART:
      return newState

    case DELETE_CART_ITEM:

      newState.cartItems = newState.cartItems.filter(item => item.product_id !== parseInt(action.prodId, 10))
      return newState

    case UPDATE_QTY:
      return newState

    case ORDER_STATUS_CHANGED:
      return newState

    default:
      return newState;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchCart = () => (dispatch, getState) => {
  const state = getState();
  const userId = state.auth ? state.auth.id : 99 // 99 should be replaced with session id

  axios.get(`/api/cartItems/${userId}`)
    .then(res => res.data)
    .then(cartItems => {
      dispatch(loadCart(cartItems))
    })
    .catch(err => console.error('Fetching cart items unsuccessful', err));
}

export const addToCart = (userId, prodId) => dispatch => {
  axios.post(`/api/cartItems/${userId}/${prodId}`)
    .then(res => res.data)
    .then(newCartItem => {
      dispatch(addItem())
    })
    .then(() => {
      dispatch(fetchCart(userId))
    })
    .catch(err => console.error('Adding item unsuccessful', err))
}

export const deleteCartItem = (prodId) => dispatch => {
  prodId = +prodId
  dispatch(deleteItem(prodId))
  axios.delete(`/api/cartItems/${prodId}`)
    .then(() => {})
    .catch(err => console.error(`deleting item ${prodId} unsuccessful`, err))
    }

export const updateItemQty = (userId, cartItemId, newQty) => dispatch => {
  axios.put(`api/cartItems/${cartItemId}/${newQty}`)
  .then( () => {
    dispatch(updateQty())
  })
  .then( () => {
    dispatch(fetchCart(userId))
  })
}

export const changeOrderStatus = (orderId, orderStatus) => dispatch => {
  axios.put(`/api/orders/${orderId}/${orderStatus}`)
  .then( () => {
    dispatch(changeOrder())
  })
}
