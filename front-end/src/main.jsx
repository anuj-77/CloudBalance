// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// // import {Provider}
// import { Provider } from 'react-redux';
// import store from './redux/store.js'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//     <App />
//   </Provider>
//   </StrictMode>,
// )

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store, persistor} from "./redux/store";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </StrictMode>
);
