import ThemeToggle from '../components/ThemeToggle'
import Sidebar from '../components/Sidebar'
import ReceivedRequest from '../components/ReceivedRequest';
import SentRequest from '../components/SentRequest';
import { useState } from 'react';

const Request = () => {
    const [activeTab, setActiveTab] = useState('sent');

    return (
        <div className="h-screen flex overflow-hidden bg-base-200 transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 overflow-y-auto lg:ml-64 pt-16 lg:pt-0">

                {/* Navbar */}
                <div className="bg-base-100 border-b border-base-300 p-5 shadow-sm flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-base-content">
                        Requests
                    </h1>
                    <ThemeToggle />
                </div>

                {/* Tab Buttons */}
                <div className="flex gap-2 p-4 bg-base-100 border-b border-base-300">
                    <button
                        className={`btn ${activeTab === 'sent' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setActiveTab('sent')}
                    >
                        Sent Requests
                    </button>

                    <button
                        className={`btn ${activeTab === 'received' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setActiveTab('received')}
                    >
                        Received Requests
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                    {activeTab === 'received' ? (
                        <ReceivedRequest />
                    ) : (
                        <SentRequest />
                    )}
                </div>

            </div>
        </div>
    );
};

export default Request;