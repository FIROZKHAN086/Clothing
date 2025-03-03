import { createContext , useState , useEffect } from "react";
import categoriesData from "../assets/categories";
import { Link } from 'react-router-dom';


export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [categories, setCategories] = useState(categoriesData);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [user, setUser] = useState(null);

  const url = "http://localhost:3000";

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
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

  const quantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

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
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
