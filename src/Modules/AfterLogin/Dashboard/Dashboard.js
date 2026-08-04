import React from 'react';
import AfterLoginLayout from '../../../AfterLoginComponents/AfterLoginLayout';
import OverviewSection from '../../../AfterLoginComponents/OverviewSection';
import AnalyticsChart from '../../../AfterLoginComponents/AnalyticsChart';
import PopularListings from '../../../AfterLoginComponents/PopularListings';
import CommunityComments from '../../../AfterLoginComponents/CommunityComments';

function Dashboard() {
    return (
        <AfterLoginLayout pageTitle="Dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
                {/* Left Column: Overview & Analytics (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <OverviewSection />
                    <AnalyticsChart />
                </div>

                {/* Right Column: Popular Listings & Comments (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <PopularListings />
                    <CommunityComments />
                </div>
            </div>
        </AfterLoginLayout>
    );
}

export default Dashboard;
