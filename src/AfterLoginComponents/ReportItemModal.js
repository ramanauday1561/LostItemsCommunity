import React, { useState } from 'react';

function ReportItemModal({ isOpen, onClose, reportType = 'lost', onPublishSuccess }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isPublishing, setIsPublishing] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [reportForm, setReportForm] = useState({
        title: '',
        category: 'Electronics',
        date: '',
        description: '',
        location: '',
        selectedCoordinates: { lat: 40.7484, lng: -73.9857 }, // Empire State Building default
        photoUrl: '',
        photoFile: null,
    });

    if (!isOpen) return null;

    const handleNextStep = () => {
        setValidationError('');
        if (currentStep === 1) {
            if (!reportForm.title.trim()) {
                setValidationError('Item title is required.');
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            if (!reportForm.location.trim()) {
                setValidationError('Map location is required. Please set or enter the item location.');
                return;
            }
            setCurrentStep(3);
        }
    };

    const handlePrevStep = () => {
        setValidationError('');
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setReportForm((prev) => ({ ...prev, photoFile: file, photoUrl: previewUrl }));
            setValidationError('');
        }
    };

    const handleSamplePhotoSelect = (url) => {
        setReportForm((prev) => ({ ...prev, photoUrl: url, photoFile: null }));
        setValidationError('');
    };

    const handlePublishReport = () => {
        if (!reportForm.photoUrl) {
            setValidationError('A product photo is required. Please upload an image or choose a sample photo.');
            return;
        }
        setIsPublishing(true);
        setTimeout(() => {
            setIsPublishing(false);
            onPublishSuccess(reportType === 'lost' ? 'Lost item report published successfully!' : 'Found item report published successfully!');
            onClose();
        }, 1200);
    };

    const samplePhotos = [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=80',
    ];

    return (
        <div className="fixed inset-0 z-[60] flex items-stretch sm:items-center justify-center sm:p-4">
            <div className="fixed inset-0 bg-[#16181F]/30 backdrop-blur-xs" onClick={onClose}></div>
            {/* Full-screen on phones so the on-screen keyboard can't squeeze the
                form into a sliver; a normal centred dialog from `sm` up. */}
            <div className="relative w-full sm:max-w-xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col rounded-none sm:rounded-3xl z-10 border-0 sm:border bg-[#FFFFFF] border-[#E6E5E1] text-[#16181F]">
                {/* Header */}
                <div className="flex justify-between items-center gap-2 shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E6E5E1] pt-[calc(0.75rem+env(safe-area-inset-top))] sm:pt-4">
                    <div className="flex items-center gap-2 min-w-0">
                        <span aria-hidden="true" className={`material-symbols-outlined text-2xl ${reportType === 'lost' ? 'text-[#B42318]' : 'text-[#157F3D]'}`}>
                            {reportType === 'lost' ? 'search' : 'task_alt'}
                        </span>
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#16181F] truncate">
                            {reportType === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
                        </h2>
                    </div>
                    <button aria-label="Close dialog" className="w-11 h-11 shrink-0 flex items-center justify-center hover:opacity-75 rounded-full transition-colors cursor-pointer text-[#6B7280]" onClick={onClose}>
                        <span aria-hidden="true" className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-5">
                {/* Step Indicators — only the current step is labelled, so three
                    captions can't wrap into three ragged columns at 375px. */}
                <div className="flex items-center gap-2">
                    {['Item Details', 'Map Location', 'Product Photo'].map((label, i) => {
                        const step = i + 1;
                        const isDone = currentStep > step;
                        const isCurrent = currentStep === step;
                        return (
                            <React.Fragment key={label}>
                                {i > 0 && <div className="flex-1 h-px bg-[#E6E5E1]"></div>}
                                <div className="flex items-center gap-2">
                                    <span className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${isDone || isCurrent ? 'bg-[#0B6BCB] text-white' : 'bg-[#F4F3F1] text-[#6B7280]'}`}>
                                        {isDone ? '✓' : step}
                                    </span>
                                    {isCurrent && (
                                        <span className="text-xs font-bold text-[#0B6BCB] whitespace-nowrap">{label}</span>
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Validation Error Alert */}
                {validationError && (
                    <div className="bg-[#B42318]/15 border border-[#B42318]/30 text-[#B42318] p-3 rounded-2xl text-xs flex items-center gap-2 font-bold">
                        <span aria-hidden="true" className="material-symbols-outlined text-base">error</span>
                        <span>{validationError}</span>
                    </div>
                )}

                {/* Form Steps */}
                <div className="space-y-4">
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#16181F]">Item Title *</label>
                                <input
                                    className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#FFFFFF] border border-[#E6E5E1] text-[#16181F] focus:border-[#0B6BCB]"
                                    placeholder="e.g. Black Leather Wallet / iPhone 15 Pro"
                                    type="text"
                                    value={reportForm.title}
                                    onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#16181F]">Category</label>
                                    <select
                                        className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#FFFFFF] border border-[#E6E5E1] text-[#16181F] focus:border-[#0B6BCB]"
                                        value={reportForm.category}
                                        onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                                    >
                                        <option value="Electronics" style={{ backgroundColor: '#FFFFFF' }}>Electronics</option>
                                        <option value="Jewelry & Watches" style={{ backgroundColor: '#FFFFFF' }}>Jewelry & Watches</option>
                                        <option value="Travel Gear" style={{ backgroundColor: '#FFFFFF' }}>Travel Gear</option>
                                        <option value="Keys" style={{ backgroundColor: '#FFFFFF' }}>Keys</option>
                                        <option value="Bags & Wallets" style={{ backgroundColor: '#FFFFFF' }}>Bags & Wallets</option>
                                        <option value="Others" style={{ backgroundColor: '#FFFFFF' }}>Others</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#16181F]">Date</label>
                                    <input
                                        className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#FFFFFF] border border-[#E6E5E1] text-[#16181F] focus:border-[#0B6BCB]"
                                        type="date"
                                        value={reportForm.date}
                                        onChange={(e) => setReportForm({ ...reportForm, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#16181F]">Description</label>
                                <textarea
                                    className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#FFFFFF] border border-[#E6E5E1] text-[#16181F] focus:border-[#0B6BCB]"
                                    placeholder="Describe unique marks, color, brand, or serial numbers..."
                                    rows={3}
                                    value={reportForm.description}
                                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <label className="text-xs font-bold block text-[#16181F]">Map Location Attachment (Required) *</label>

                            {/* Simulated Interactive Map Widget */}
                            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#E6E5E1] bg-[#FFFFFF]">
                                <div
                                    className="w-full h-full bg-cover bg-center opacity-80"
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80')`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-[#FAFAF9]/50 flex items-center justify-center">
                                        <div className="flex flex-col items-center animate-bounce">
                                            <span aria-hidden="true" className="material-symbols-outlined text-4xl text-[#B42318] drop-">location_on</span>
                                            <span className="bg-[#FFFFFF] text-[#16181F] border border-[#E6E5E1] text-xs sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                                Selected Pin
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Pin Presets */}
                            <div className="space-y-1">
                                <span className="text-xs sm:text-[11px] font-bold text-[#6B7280]">Quick Location Presets:</span>
                                <div className="flex gap-2 text-xs flex-wrap">
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'Central Park Fountain, NY' })} className="min-h-[44px] px-3 py-1 bg-[#FFFFFF] border border-[#E6E5E1] text-[#0B6BCB] hover:border-[#0B6BCB] rounded-xl cursor-pointer">Central Park</button>
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'JFK Airport Terminal 4' })} className="min-h-[44px] px-3 py-1 bg-[#FFFFFF] border border-[#E6E5E1] text-[#0B6BCB] hover:border-[#0B6BCB] rounded-xl cursor-pointer">JFK Airport</button>
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'Downtown Mall, 5th Ave' })} className="min-h-[44px] px-3 py-1 bg-[#FFFFFF] border border-[#E6E5E1] text-[#0B6BCB] hover:border-[#0B6BCB] rounded-xl cursor-pointer">Downtown Mall</button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs sm:text-[11px] font-bold text-[#6B7280]">Address / Specific Area *</label>
                                <div className="relative">
                                    <span aria-hidden="true" className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#B42318] text-lg">my_location</span>
                                    <input
                                        className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-2xl outline-none text-xs font-semibold bg-[#FFFFFF] border border-[#E6E5E1] text-[#16181F] focus:border-[#0B6BCB]"
                                        type="text"
                                        placeholder="e.g. 350 5th Ave, New York, NY 10118 (or click preset pin)"
                                        value={reportForm.location}
                                        onChange={(e) => {
                                            setReportForm({ ...reportForm, location: e.target.value });
                                            setValidationError('');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <label className="text-xs font-bold block text-[#16181F]">Product Picture Attachment (Required) *</label>
                            
                            {reportForm.photoUrl ? (
                                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#E6E5E1] group">
                                    <img src={reportForm.photoUrl} alt="Product Attachment" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setReportForm({ ...reportForm, photoUrl: '', photoFile: null })}
                                            className="bg-[#B42318] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                                        >
                                            <span aria-hidden="true" className="material-symbols-outlined text-sm">delete</span>
                                            Remove Photo
                                        </button>
                                    </div>
                                    <span className="absolute bottom-2 left-2 bg-[#157F3D] text-white text-xs sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                                        <span aria-hidden="true" className="material-symbols-outlined text-xs">check_circle</span> Photo Attached
                                    </span>
                                </div>
                            ) : (
                                <label className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-[#E6E5E1] hover:bg-[#FFFFFF]">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                    <span aria-hidden="true" className="material-symbols-outlined text-4xl mb-2 text-[#0B6BCB]">add_a_photo</span>
                                    <h4 className="text-xs font-bold text-[#16181F]">Upload Product Picture *</h4>
                                    <p className="text-xs sm:text-[11px] text-[#6B7280] mt-1">Click to select image file from your device.</p>
                                </label>
                            )}

                            {/* Or pick a sample picture */}
                            {!reportForm.photoUrl && (
                                <div className="space-y-2 pt-2">
                                    <span className="text-xs sm:text-[11px] font-bold text-[#6B7280]">Or pick sample photo for demo:</span>
                                    <div className="grid grid-cols-3 gap-2">
                                        {samplePhotos.map((url, idx) => (
                                            <img
                                                key={idx}
                                                src={url}
                                                alt={`Sample ${idx}`}
                                                className="w-full h-16 rounded-xl object-cover border border-[#E6E5E1] cursor-pointer hover:opacity-80 hover:border-[#0B6BCB] transition-all"
                                                onClick={() => handleSamplePhotoSelect(url)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                </div>

                {/* Footer Navigation Buttons — pinned, so the primary action is
                    always in reach without scrolling the form to the end. */}
                <div className="flex justify-between items-center gap-3 shrink-0 px-4 sm:px-6 py-3 border-t border-[#E6E5E1] pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                    <button
                        className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-bold text-[#6B7280] hover:text-[#16181F] cursor-pointer ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                        onClick={handlePrevStep}
                    >
                        Back
                    </button>

                    {currentStep < 3 ? (
                        <button
                            className="min-h-[44px] bg-[#0B6BCB] text-white px-5 py-2.5 rounded-full text-sm font-extrabold hover:opacity-90 transition-all cursor-pointer"
                            onClick={handleNextStep}
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            className="min-h-[44px] bg-[#0B6BCB] text-white px-6 py-2.5 rounded-full text-sm font-extrabold hover:opacity-90 transition-all cursor-pointer flex items-center gap-1.5"
                            onClick={handlePublishReport}
                            disabled={isPublishing}
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-sm">publish</span>
                            <span>{isPublishing ? 'Publishing...' : 'Publish Report'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportItemModal;
