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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose}></div>
            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl z-10 p-6 space-y-6 border transition-colors bg-[#1E212B] border-[#262A36] text-[#F4F5F6]">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-[#262A36]">
                    <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-2xl ${reportType === 'lost' ? 'text-[#FF5376]' : 'text-[#00FF9D]'}`}>
                            {reportType === 'lost' ? 'search' : 'task_alt'}
                        </span>
                        <h2 className="text-xl font-extrabold text-[#F4F5F6]">
                            {reportType === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
                        </h2>
                    </div>
                    <button className="p-1 hover:opacity-75 rounded-full transition-colors cursor-pointer text-[#9A9FA5]" onClick={onClose}>
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-between px-4">
                    <div className={`flex items-center gap-2 text-xs font-bold ${currentStep >= 1 ? 'text-[#38DFFF]' : 'text-[#9A9FA5]'}`}>
                        <span className="w-6 h-6 rounded-full bg-[#38DFFF]/15 flex items-center justify-center text-xs text-[#38DFFF]">1</span>
                        <span>Item Details</span>
                    </div>
                    <div className="flex-1 h-0.5 mx-3 bg-[#262A36]"></div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${currentStep >= 2 ? 'text-[#38DFFF]' : 'text-[#9A9FA5]'}`}>
                        <span className="w-6 h-6 rounded-full bg-[#38DFFF]/15 flex items-center justify-center text-xs text-[#38DFFF]">2</span>
                        <span>Map Location *</span>
                    </div>
                    <div className="flex-1 h-0.5 mx-3 bg-[#262A36]"></div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${currentStep >= 3 ? 'text-[#38DFFF]' : 'text-[#9A9FA5]'}`}>
                        <span className="w-6 h-6 rounded-full bg-[#38DFFF]/15 flex items-center justify-center text-xs text-[#38DFFF]">3</span>
                        <span>Product Photo *</span>
                    </div>
                </div>

                {/* Validation Error Alert */}
                {validationError && (
                    <div className="bg-[#FF5376]/15 border border-[#FF5376]/30 text-[#FF5376] p-3 rounded-2xl text-xs flex items-center gap-2 font-bold">
                        <span className="material-symbols-outlined text-base">error</span>
                        <span>{validationError}</span>
                    </div>
                )}

                {/* Form Steps */}
                <div className="space-y-4">
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#F4F5F6]">Item Title *</label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#14161D] border border-[#262A36] text-[#F4F5F6] focus:border-[#38DFFF]"
                                    placeholder="e.g. Black Leather Wallet / iPhone 15 Pro"
                                    type="text"
                                    value={reportForm.title}
                                    onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#F4F5F6]">Category</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#14161D] border border-[#262A36] text-[#F4F5F6] focus:border-[#38DFFF]"
                                        value={reportForm.category}
                                        onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                                    >
                                        <option value="Electronics" style={{ backgroundColor: '#1E212B' }}>Electronics</option>
                                        <option value="Jewelry & Watches" style={{ backgroundColor: '#1E212B' }}>Jewelry & Watches</option>
                                        <option value="Travel Gear" style={{ backgroundColor: '#1E212B' }}>Travel Gear</option>
                                        <option value="Keys" style={{ backgroundColor: '#1E212B' }}>Keys</option>
                                        <option value="Bags & Wallets" style={{ backgroundColor: '#1E212B' }}>Bags & Wallets</option>
                                        <option value="Others" style={{ backgroundColor: '#1E212B' }}>Others</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#F4F5F6]">Date</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#14161D] border border-[#262A36] text-[#F4F5F6] focus:border-[#38DFFF]"
                                        type="date"
                                        value={reportForm.date}
                                        onChange={(e) => setReportForm({ ...reportForm, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#F4F5F6]">Description</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#14161D] border border-[#262A36] text-[#F4F5F6] focus:border-[#38DFFF]"
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
                            <label className="text-xs font-bold block text-[#F4F5F6]">Map Location Attachment (Required) *</label>

                            {/* Simulated Interactive Map Widget */}
                            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#262A36] bg-[#14161D]">
                                <div
                                    className="w-full h-full bg-cover bg-center opacity-80"
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80')`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-[#0D0E12]/50 flex items-center justify-center">
                                        <div className="flex flex-col items-center animate-bounce">
                                            <span className="material-symbols-outlined text-4xl text-[#FF5376] drop-shadow-md">location_on</span>
                                            <span className="bg-[#1E212B] text-[#F4F5F6] border border-[#262A36] text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                                Selected Pin
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Pin Presets */}
                            <div className="space-y-1">
                                <span className="text-[11px] font-bold text-[#9A9FA5]">Quick Location Presets:</span>
                                <div className="flex gap-2 text-xs flex-wrap">
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'Central Park Fountain, NY' })} className="px-2.5 py-1 bg-[#14161D] border border-[#262A36] text-[#38DFFF] hover:border-[#38DFFF] rounded-xl cursor-pointer">Central Park</button>
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'JFK Airport Terminal 4' })} className="px-2.5 py-1 bg-[#14161D] border border-[#262A36] text-[#38DFFF] hover:border-[#38DFFF] rounded-xl cursor-pointer">JFK Airport</button>
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'Downtown Mall, 5th Ave' })} className="px-2.5 py-1 bg-[#14161D] border border-[#262A36] text-[#38DFFF] hover:border-[#38DFFF] rounded-xl cursor-pointer">Downtown Mall</button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-[#9A9FA5]">Address / Specific Area *</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#FF5376] text-lg">my_location</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl outline-none text-xs font-semibold bg-[#14161D] border border-[#262A36] text-[#F4F5F6] focus:border-[#38DFFF]"
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
                            <label className="text-xs font-bold block text-[#F4F5F6]">Product Picture Attachment (Required) *</label>
                            
                            {reportForm.photoUrl ? (
                                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#262A36] group">
                                    <img src={reportForm.photoUrl} alt="Product Attachment" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setReportForm({ ...reportForm, photoUrl: '', photoFile: null })}
                                            className="bg-[#FF5376] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                            Remove Photo
                                        </button>
                                    </div>
                                    <span className="absolute bottom-2 left-2 bg-[#00FF9D] text-[#0D0E12] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                                        <span className="material-symbols-outlined text-xs">check_circle</span> Photo Attached
                                    </span>
                                </div>
                            ) : (
                                <label className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-[#262A36] hover:bg-[#14161D]">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                    <span className="material-symbols-outlined text-4xl mb-2 text-[#38DFFF]">add_a_photo</span>
                                    <h4 className="text-xs font-bold text-[#F4F5F6]">Upload Product Picture *</h4>
                                    <p className="text-[11px] text-[#9A9FA5] mt-1">Click to select image file from your device.</p>
                                </label>
                            )}

                            {/* Or pick a sample picture */}
                            {!reportForm.photoUrl && (
                                <div className="space-y-2 pt-2">
                                    <span className="text-[11px] font-bold text-[#9A9FA5]">Or pick sample photo for demo:</span>
                                    <div className="grid grid-cols-3 gap-2">
                                        {samplePhotos.map((url, idx) => (
                                            <img
                                                key={idx}
                                                src={url}
                                                alt={`Sample ${idx}`}
                                                className="w-full h-16 rounded-xl object-cover border border-[#262A36] cursor-pointer hover:opacity-80 hover:border-[#38DFFF] transition-all"
                                                onClick={() => handleSamplePhotoSelect(url)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Navigation Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-[#262A36]">
                    <button
                        className={`px-4 py-2 rounded-full text-xs font-bold text-[#9A9FA5] hover:text-[#F4F5F6] cursor-pointer ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                        onClick={handlePrevStep}
                    >
                        Back
                    </button>

                    {currentStep < 3 ? (
                        <button
                            className="bg-gradient-to-r from-[#38DFFF] to-[#00B2FE] text-[#0D0E12] px-5 py-2.5 rounded-full text-xs font-extrabold shadow-[0_0_15px_rgba(56,223,255,0.3)] hover:opacity-90 transition-all cursor-pointer"
                            onClick={handleNextStep}
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            className="bg-gradient-to-r from-[#38DFFF] to-[#00B2FE] text-[#0D0E12] px-6 py-2.5 rounded-full text-xs font-extrabold shadow-[0_0_15px_rgba(56,223,255,0.35)] hover:opacity-90 transition-all cursor-pointer flex items-center gap-1.5"
                            onClick={handlePublishReport}
                            disabled={isPublishing}
                        >
                            <span className="material-symbols-outlined text-sm">publish</span>
                            <span>{isPublishing ? 'Publishing...' : 'Publish Report'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportItemModal;
