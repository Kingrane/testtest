import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Calendar } from 'lucide-react';

const WeekToggle = ({ currentWeek, onChange }) => {
    const options = [
        { value: 'all', label: 'Все недели', icon: Calendar, color: 'bg-neo-white' },
        { value: 'upper', label: 'Верхняя', icon: ArrowUpCircle, color: 'bg-neo-yellow' },
        { value: 'lower', label: 'Нижняя', icon: ArrowDownCircle, color: 'bg-neo-pink' },
    ];

    return (
        <div className="flex gap-2 p-1 bg-white border-3 border-black shadow-neo inline-flex rounded-lg">
            {options.map((option) => {
                const Icon = option.icon;
                const isActive = currentWeek === option.value;

                return (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={`
              flex items-center gap-2 px-4 py-2 rounded font-display font-bold text-sm
              transition-all duration-200 border-3
              ${isActive
                            ? `${option.color} border-black shadow-neo-sm translate-y-0.5`
                            : 'border-transparent hover:bg-gray-100'
                        }
            `}
                    >
                        <Icon size={18} strokeWidth={2.5} />
                        <span className="hidden sm:inline">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default WeekToggle;