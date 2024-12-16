import { ToastContainer } from 'react-toastify'
import './App.css'
import Summary from './sections/Summary'
import TimeTracker from './sections/TimeTracker'

import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
    const [refreshFlag, setRefreshFlag] = useState(0);

    return (
        <div className='flex h-screen w-screen'>
            <TimeTracker setRefreshFlag={setRefreshFlag}/>
            <Summary refreshFlag={refreshFlag}/>
            <ToastContainer
                position="top-right"
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
