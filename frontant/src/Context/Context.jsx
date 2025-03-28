import { createContext , useState , useEffect } from "react";
import categoriesData from "../assets/categories";
import { Link } from 'react-router-dom';
import axios from "axios";  

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [user, setUser] = useState(null);

  const url = "https://clothing-a7pp.onrender.com";
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/product/getAllProducts`);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    }
    fetchCategories();

  }, [cart]);

  const addtocart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removefromcart = (productId) => {
    const newcart = cart.filter((item) => item.id !== productId);
    setCart(newcart);
  };
  const clearfromcart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleCategories = (category) => {
    setCategories(prevCategories => {
      if (!prevCategories.includes(category)) {
        return [...prevCategories, category];
      }
      return prevCategories.filter(item => item !== category);
    });
  };
  const order = () => {
    cart.splice(0, cart.length);
    localStorage.removeItem('cart');
    setOrders([...orders, cart]);
  }

  const quantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const createOrder = async (orderData) => {
    try {
      const response = await axios.post(`${url}/api/orders/create`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders([...orders, response.data]);
      clearfromcart(); // Clear cart after successful order
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const ContextValue = {
    cart,
    addtocart,
    removefromcart,
    clearfromcart,
    categories,
    handleCategories,
    quantity,
    token,
    setToken,
    url,
    order,
    orders,
    setOrders,
    createOrder,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
