import ReactDOM from "react-dom/client";
import App from "./App";
import "./translation/i18n";
import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";
import { store } from "redux/store";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </Provider>
);
