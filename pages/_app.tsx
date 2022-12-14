import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { wrapper } from "../store";

const App: React.FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Layout>
                <Component {...props} />
            </Layout>
        </Provider>
    );
};

export default App;
