import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import "./_reset.css";
import WebFont from "webfontloader";
import {AppRouter} from "@app/app-router";
import {store} from "@entities/store";
import {AppPrefetch} from "@app/app-prefetch";
import {AppLayout} from "@app/app-layout";
import {CookiesProvider} from "react-cookie";

WebFont.load({
    google: {
        families: ["Inter:300,400,500,600,700,800", "sans-serif"]
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <AppLayout>
                    <AppPrefetch>
                        <AppRouter/>
                    </AppPrefetch>
                </AppLayout>
            </BrowserRouter>
        </Provider>
    </CookiesProvider>,
)