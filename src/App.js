import { useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/user.action";
import { GlobalStyle } from "./global.styles";

const App = () => {
  const dispatch = useDispatch();

  // Effect for authentication using firebase. Sets the user state
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user);
  //     }
  //     dispatch(setCurrentUser(user));
  //   });

  //   return unsubscribe;
  // }, []);

  // Effect for authentication using firebase. Sets the user state (react saga version)
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
