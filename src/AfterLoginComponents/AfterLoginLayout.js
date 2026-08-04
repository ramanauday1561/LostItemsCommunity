import React, { useState } from 'react';
import AfterLoginSidebar from './AfterLoginSidebar';
import AfterLoginHeader from './AfterLoginHeader';
import ReportItemModal from './ReportItemModal';
import './AfterLogin.css';

function AfterLoginLayout({ children, pageTitle = "Dashboard" }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [searchQuery, setSearchQuery] = useState('');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportType, setReportType] = useState('lost');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleOpenReportModal = (type = 'lost') => {
        setReportType(type);
        setIsReportModalOpen(true);
    };

    const handlePublishSuccess = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    };

    return (
        <div className="bg-[#EFEFEF] min-h-screen text-[#1A1D1F] font-sans antialiased selection:bg-black selection:text-white p-2 sm:p-4 md:p-6">
            <div className="max-w-[1536px] mx-auto bg-[#F4F5F6] rounded-3xl sm:rounded-[36px] border border-black/5 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[92vh]">
                
                {/* Reusable Sidebar */}
                <AfterLoginSidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 bg-[#FCFCFC] rounded-2xl md:rounded-l-[32px] md:rounded-r-none border-l border-black/5">
                    {/* Reusable Header */}
                    <AfterLoginHeader
                        toggleSidebar={toggleSidebar}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onOpenReportModal={handleOpenReportModal}
                        title={pageTitle}
                    />

                    {/* Page Content */}
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </div>

            {/* Reusable Reporting Modal */}
            <ReportItemModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                reportType={reportType}
                onPublishSuccess={handlePublishSuccess}
            />

            {/* Feedback Toast */}
            <div
                className={`fixed bottom-4 left-4 bg-[#1A1D1F] text-white px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 z-[100] flex items-center gap-2 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}
            >
                <span className="material-symbols-outlined text-[#83BF6E] text-sm">check_circle</span>
                <span className="text-xs font-semibold">{toastMessage}</span>
            </div>
        </div>
    );
}

export default AfterLoginLayout;
