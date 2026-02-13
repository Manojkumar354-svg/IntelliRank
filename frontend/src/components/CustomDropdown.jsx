import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomDropdown = ({ value, onChange, options, placeholder, icon: Icon, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { value: optionValue } });
        setIsOpen(false);
    };

    const selectedOptionText = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div className={`relative inline-block w-full md:w-auto ${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-3 bg-[#111827] px-4 py-2.5 rounded-xl border border-[#1F2937] hover:border-blue-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                <div className="flex items-center gap-2">
                    {Icon && <Icon size={14} className="text-slate-600" />}
                    <span className="text-[#E5E7EB] text-[10px] font-black uppercase tracking-widest truncate max-w-[120px]">
                        {selectedOptionText}
                    </span>
                </div>
                <ChevronDown size={14} className={`text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-[180px] bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl z-[100] overflow-hidden animate-fade-in py-1">
                    <ul className="max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors
                    ${value === option.value
                                            ? 'bg-[#2563EB] text-white'
                                            : 'text-[#E5E7EB] hover:bg-[#1E293B]'
                                        }`}
                                >
                                    {option.label}
                                    {value === option.value && <Check size={12} />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
