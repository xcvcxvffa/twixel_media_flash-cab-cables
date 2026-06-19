import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import mockServer from './mock'
import appConfig from '@/configs/app.config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './locales'

const environment = process.env.NODE_ENV

if (appConfig.enableMock) {
    mockServer({ environment })
}

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Theme>
                        <Layout />
                        <ToastContainer 
                            position="bottom-right" 
                            autoClose={4000} 
                            hideProgressBar={true}
                            closeButton={false}
                            newestOnTop={true}
                            closeOnClick
                            pauseOnHover
                            theme="light"
                            toastClassName="!rounded-2xl !shadow-[0_8px_30px_rgb(0,0,0,0.04)] !border !backdrop-blur-xl"
                        />
                    </Theme>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
