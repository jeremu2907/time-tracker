import { ToastContainer } from 'react-toastify'
import './App.css'
import Summary from './sections/Summary'
import TimeTracker from './sections/TimeTracker'

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className='flex h-screen w-screen'>
            <TimeTracker />
            <Summary />
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </div>
    )
}

export default App
