import React, { useState } from 'react';

function ReportItemModal({ isOpen, onClose, reportType = 'lost', onPublishSuccess }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isPublishing, setIsPublishing] = useState(false);
    const [reportForm, setReportForm] = useState({
        title: '',
        category: 'Electronics',
        date: '',
        description: '',
        location: '350 5th Ave, New York, NY 10118',
    });

    if (!isOpen) return null;

    const handleNextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handlePublishReport = () => {
        setIsPublishing(true);
        setTimeout(() => {
            setIsPublishing(false);
            onClose();
            if (onPublishSuccess) {
                onPublishSuccess(`Report successfully published as ${reportType.toUpperCase()}!`);
            }
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl z-10 p-6 space-y-6 border border-black/10">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-black/5">
                    <h2 className="text-xl font-bold text-[#1A1D1F]">
                        {reportType === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
                    </h2>
                    <button className="p-1 hover:bg-[#F4F5F6] rounded-full transition-colors" onClick={onClose}>
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#1A1D1F]">Item Title</label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F4F5F6] border-none text-xs outline-none text-[#1A1D1F]"
                                    placeholder="e.g. Rolex Submariner Watch"
                                    type="text"
                                    value={reportForm.title}
                                    onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#1A1D1F]">Category</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#F4F5F6] border-none text-xs outline-none text-[#1A1D1F]"
                                        value={reportForm.category}
                                        onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                                    >
                                        <option value="Electronics">Electronics</option>
                                        <option value="Jewelry & Watches">Jewelry & Watches</option>
                                        <option value="Travel Gear">Travel Gear</option>
                                        <option value="Keys">Keys</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#1A1D1F]">Date</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#F4F5F6] border-none text-xs outline-none text-[#1A1D1F]"
                                        type="date"
                                        value={reportForm.date}
                                        onChange={(e) => setReportForm({ ...reportForm, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#1A1D1F]">Description</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F4F5F6] border-none text-xs outline-none text-[#1A1D1F]"
                                    placeholder="Describe unique features or serial numbers..."
                                    rows={3}
                                    value={reportForm.description}
                                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <p className="text-xs text-[#6F767E]">Verify address location below:</p>
                            <div className="w-full h-48 rounded-2xl bg-[#F4F5F6] overflow-hidden relative border border-black/5 flex items-center justify-center">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Location Map Preview"
                                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80"
                                />
                                <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl border border-black/5 shadow-md flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#1A1D1F] text-sm">my_location</span>
                                    <input
                                        className="bg-transparent border-none focus:ring-0 w-full text-xs outline-none"
                                        type="text"
                                        value={reportForm.location}
                                        onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="border-2 border-dashed border-black/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F4F5F6] transition-all">
                            <span className="material-symbols-outlined text-[#1A1D1F] text-4xl mb-2">add_a_photo</span>
                            <h4 className="text-xs font-bold text-[#1A1D1F]">Upload Item Photos</h4>
                            <p className="text-[11px] text-[#6F767E] mt-1">Drag and drop or click to browse photos.</p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between pt-4 border-t border-black/5">
                    <button
                        className={`px-4 py-2 rounded-full text-xs font-bold text-[#6F767E] hover:bg-[#F4F5F6] transition-all ${currentStep === 1 ? 'invisible' : 'visible'}`}
                        onClick={handlePrevStep}
                    >
                        Back
                    </button>

                    {currentStep < 3 ? (
                        <button
                            className="px-6 py-2.5 bg-[#1A1D1F] text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1"
                            onClick={handleNextStep}
                        >
                            <span>Next Step</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    ) : (
                        <button
                            className="px-6 py-2.5 bg-[#1A1D1F] text-white rounded-full text-xs font-bold shadow-md"
                            onClick={handlePublishReport}
                            disabled={isPublishing}
                        >
                            {isPublishing ? <span>Publishing...</span> : <span>Publish Report</span>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportItemModal;
