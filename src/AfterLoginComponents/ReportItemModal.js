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
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose}></div>
            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl z-10 p-6 space-y-6 border transition-colors bg-white border-black/10 text-[#1A1D1F]">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-black/10">
                    <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-2xl ${reportType === 'lost' ? 'text-red-500' : 'text-green-500'}`}>
                            {reportType === 'lost' ? 'search' : 'task_alt'}
                        </span>
                        <h2 className="text-xl font-bold">
                            {reportType === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
                        </h2>
                    </div>
                    <button className="p-1 hover:opacity-75 rounded-full transition-colors cursor-pointer" onClick={onClose}>
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-between px-4">
                    <div className={`flex items-center gap-2 text-xs font-bold ${currentStep >= 1 ? 'text-blue-500' : 'text-[#6F767E]'}`}>
                        <span className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-xs">1</span>
                        <span>Item Details</span>
                    </div>
                    <div className="flex-1 h-0.5 mx-3 bg-black/10"></div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${currentStep >= 2 ? 'text-blue-500' : 'text-[#6F767E]'}`}>
                        <span className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-xs">2</span>
                        <span>Map Location *</span>
                    </div>
                    <div className="flex-1 h-0.5 mx-3 bg-black/10"></div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${currentStep >= 3 ? 'text-blue-500' : 'text-[#6F767E]'}`}>
                        <span className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-xs">3</span>
                        <span>Product Photo *</span>
                    </div>
                </div>

                {/* Validation Error Alert */}
                {validationError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-2xl text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">error</span>
                        <span>{validationError}</span>
                    </div>
                )}

                {/* Form Steps */}
                <div className="space-y-4">
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold">Item Title *</label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#F4F5F6] text-[#1A1D1F]"
                                    placeholder="e.g. Black Leather Wallet / iPhone 15 Pro"
                                    type="text"
                                    value={reportForm.title}
                                    onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold">Category</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#F4F5F6] text-[#1A1D1F]"
                                        value={reportForm.category}
                                        onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                                    >
                                        <option value="Electronics">Electronics</option>
                                        <option value="Jewelry & Watches">Jewelry & Watches</option>
                                        <option value="Travel Gear">Travel Gear</option>
                                        <option value="Keys">Keys</option>
                                        <option value="Bags & Wallets">Bags & Wallets</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold">Date</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#F4F5F6] text-[#1A1D1F]"
                                        type="date"
                                        value={reportForm.date}
                                        onChange={(e) => setReportForm({ ...reportForm, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold">Description</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-2xl outline-none text-xs bg-[#F4F5F6] text-[#1A1D1F]"
                                    placeholder="Describe unique marks, color, brand, or serial numbers..."
                                    rows={3}
                                    value={reportForm.description}
                                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold">Map Location (Required) *</label>
                                <span className="text-[11px] text-blue-500 font-medium">Click pin or enter address</span>
                            </div>
                            
                            <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-black/10 shadow-inner group">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Interactive Location Map"
                                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80"
                                />
                                {/* Pin indicator overlay */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="flex flex-col items-center animate-bounce">
                                        <span className="material-symbols-outlined text-red-500 text-4xl drop-shadow-md">location_on</span>
                                        <span className="bg-black/80 text-white text-[10px] px-2 py-0.5 rounded-full shadow font-bold">
                                            {reportForm.location || 'Item Location Pin'}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Quick location presets */}
                                <div className="absolute top-2 right-2 flex gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-xl shadow text-[10px] text-black font-semibold">
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'Central Park, New York, NY' })} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">Central Park</button>
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'JFK Airport Terminal 4' })} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">JFK Airport</button>
                                    <button type="button" onClick={() => setReportForm({ ...reportForm, location: 'Downtown Mall, 5th Ave' })} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">Downtown Mall</button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-[#6F767E]">Address / Specific Area *</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-lg">my_location</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl outline-none text-xs font-semibold bg-[#F4F5F6] text-[#1A1D1F]"
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
                            <label className="text-xs font-bold block">Product Picture Attachment (Required) *</label>
                            
                            {reportForm.photoUrl ? (
                                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-black/10 group">
                                    <img src={reportForm.photoUrl} alt="Product Attachment" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setReportForm({ ...reportForm, photoUrl: '', photoFile: null })}
                                            className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                            Remove Photo
                                        </button>
                                    </div>
                                    <span className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                                        <span className="material-symbols-outlined text-xs">check_circle</span> Photo Attached
                                    </span>
                                </div>
                            ) : (
                                <label className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-black/20 hover:bg-[#F4F5F6]">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                    <span className="material-symbols-outlined text-4xl mb-2 text-blue-500">add_a_photo</span>
                                    <h4 className="text-xs font-bold">Upload Product Picture *</h4>
                                    <p className="text-[11px] text-[#6F767E] mt-1">Click to select image file from your device.</p>
                                </label>
                            )}

                            {/* Or pick a sample picture */}
                            {!reportForm.photoUrl && (
                                <div className="space-y-2 pt-2">
                                    <span className="text-[11px] text-[#6F767E] font-semibold">Or select a sample product photo:</span>
                                    <div className="flex gap-3">
                                        {samplePhotos.map((url, i) => (
                                            <img
                                                key={i}
                                                src={url}
                                                alt={`Sample ${i}`}
                                                className="w-16 h-16 rounded-xl object-cover border-2 border-transparent hover:border-blue-500 cursor-pointer shadow-xs"
                                                onClick={() => handleSamplePhotoSelect(url)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between pt-4 border-t border-black/10">
                    <button
                        className={`px-4 py-2 rounded-full text-xs font-bold text-[#6F767E] hover:bg-black/5 transition-all cursor-pointer ${currentStep === 1 ? 'invisible' : 'visible'}`}
                        onClick={handlePrevStep}
                    >
                        Back
                    </button>

                    {currentStep < 3 ? (
                        <button
                            className="px-6 py-2.5 bg-[#1A1D1F] hover:bg-black text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer"
                            onClick={handleNextStep}
                        >
                            <span>Next Step</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    ) : (
                        <button
                            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-xs font-bold shadow-md cursor-pointer flex items-center gap-1"
                            onClick={handlePublishReport}
                            disabled={isPublishing}
                        >
                            {isPublishing ? (
                                <span>Publishing...</span>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-sm">send</span>
                                    <span>Publish Report</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportItemModal;

