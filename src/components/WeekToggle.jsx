import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Calendar } from 'lucide-react';

const WeekToggle = ({ currentWeek, onChange }) => {
    const options = [
        { 
            value: 'all', 
            label: 'Все недели', 
            icon: Calendar,
            activeClass: 'bg-gray-900 text-white'
        },
        { 
            value: 'upper', 
            label: 'Верхняя', 
            icon: ArrowUpCircle,
            activeClass: 'bg-purple-600 text-white'
        },
        { 
            value: 'lower', 
            label: 'Нижняя', 
            icon: ArrowDownCircle,
            activeClass: 'bg-blue-600 text-white'
        },
    ];

    return (
        <div className="flex bg-white border border-gray-200 p-1">
            {options.map((option) => {
                const Icon = option.icon;
                const isActive = currentWeek === option.value;

                return (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={`
                            flex items-center gap-2 px-4 py-2 font-display font-semibold text-sm
                            transition-all duration-200
                            ${isActive
                                ? option.activeClass
                                : 'text-gray-600 hover:bg-gray-100'
                            }
                        `}
                    >
                        <Icon size={16} strokeWidth={2} />
                        <span className="hidden sm:inline font-comfortaa">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default WeekToggle;
