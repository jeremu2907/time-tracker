import './App.css'
import { Menu } from './components/Menu'
import MonthlyLoggerPage from './page/monthlyLoggerPage'

function App() {
    return (
        <>
            <div className='flex justify-between items-end mb-10 font-semibold'>
                <h1>Time keeper</h1>
                <Menu />
            </div>
            <main className='flex-column content-center'>
                <MonthlyLoggerPage />
            </main>
        </>
    )
}

export default App
