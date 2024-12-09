import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* provider del store */}
    <Provider store={store}> 
      <App />
    </Provider>
  </StrictMode>
);
