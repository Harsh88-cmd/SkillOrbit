import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ThemeToggle from '../components/ThemeToggle'
import UpcomingSession from '../components/UpcomingSession';
import PastSession from '../components/PastSession';

const Session = () => {
    const[activeTab , setActiveTab] = useState('upcoming');

    return (
        <div className="h-screen flex overflow-hidden bg-base-200 transition-colors duration-300">
            <Sidebar/>
            <div className="flex-1 overflow-y-auto lg:ml-64 pt-16 lg:pt-0">

                {/* Navbar */}
                <div className="bg-base-100 border-b border-base-300 p-5 shadow-sm flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-base-content">
                        My Sessions
                    </h1>
                    <ThemeToggle/>
                </div>

                <div className="flex gap-2 p-4 bg-base-100 border-b border-base-300">
                    <button
                        className={`btn ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming Session
                    </button>
                    <button
                        className={`btn ${activeTab === 'past' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setActiveTab('past')}
                    >
                        Past session
                    </button>
                </div>

                 <div className="p-4">
                    {activeTab === 'upcoming' ? (
                        <UpcomingSession/>
                    ) : (
                        <PastSession/>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Session