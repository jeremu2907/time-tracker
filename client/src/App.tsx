import './App.css'
import Summary from './section/Summary'
import TimeTracker from './section/TimeTracker'

function App() {
    return (
        <div className='flex h-screen w-screen'>
            <TimeTracker />
            <Summary />
        </div>
    )
}

export default App
