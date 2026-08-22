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
        <div className="afterlogin-root min-h-screen antialiased selection:bg-[#0B6BCB] selection:text-white p-0 sm:p-4 md:p-6 bg-[#FAFAF9] text-[#16181F]">
            <div className="max-w-[1536px] mx-auto rounded-none sm:rounded-[36px] overflow-hidden flex flex-col md:flex-row min-h-[92vh] border bg-[#FFFFFF] border-[#E6E5E1]">
                
                {/* Reusable Sidebar */}
                <AfterLoginSidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col p-3 sm:p-6 md:p-8 md:rounded-l-[32px] md:rounded-r-none md:border-l bg-[#FAFAF9] border-[#E6E5E1]">
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
                className={`fixed bottom-4 left-4 bg-[#FFFFFF] border border-[#E6E5E1] text-[#16181F] px-4 py-2.5 rounded-full transition-all duration-300 z-[100] flex items-center gap-2 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}
            >
                <span aria-hidden="true" className="material-symbols-outlined text-[#0B6BCB] text-sm">check_circle</span>
                <span className="text-xs font-semibold">{toastMessage}</span>
            </div>
        </div>
    );
}

export default AfterLoginLayout;

