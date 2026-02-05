import React from 'react';
import ScheduleCard from './ScheduleCard';
import ScheduleCardCompact from './ScheduleCardCompact';
import { Coffee } from 'lucide-react';

const TIME_SLOTS = [
    { start: '08:00', end: '09:35', num: 1 },
    { start: '09:50', end: '11:25', num: 2 },
    { start: '11:55', end: '13:30', num: 3 },
    { start: '13:45', end: '15:20', num: 4 },
    { start: '15:50', end: '17:25', num: 5 },
    { start: '17:40', end: '19:15', num: 6 },
    { start: '19:30', end: '21:05', num: 7 },
];

const DayColumn = ({ dayNumber, dayName, lessons, compact = false }) => {
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;
    const isToday = adjustedToday === dayNumber;

    const findLesson = (slotStart) => {
        return lessons.find(l => l.start === slotStart);
    };

    const isDayOff = lessons.length === 0;

    return (
        <div className="bg-white h-full flex flex-col border border-black">
            {/* Header */}
            <div className={`p-2.5 border-b border-black ${isToday ? 'bg-rose-100' : 'bg-gray-100'}`}>
                <div className="flex items-baseline justify-between">
                    <h2 className={`font-display font-black text-xs uppercase tracking-widest ${isToday ? 'text-rose-700' : 'text-gray-900'}`}>
                        {dayName}
                    </h2>
                    {isToday && (
                        <span className="font-comfortaa text-[9px] uppercase tracking-[0.2em] text-rose-600 font-bold">
                            Сегодня
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                {isDayOff ? (
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-stone-100 pattern-diagonal">
                        <Coffee size={24} className="text-stone-400 mb-2" strokeWidth={1.5} />
                        <span className="font-display font-bold text-[9px] uppercase tracking-[0.25em] text-stone-500">
                            Выходной
                        </span>
                    </div>
                ) : (
                    <div className="p-1 space-y-1">
                        {TIME_SLOTS.map((slot) => {
                            const lesson = findLesson(slot.start);

                            if (lesson) {
                                return (
                                    <div key={slot.num}>
                                        {compact ? (
                                            <ScheduleCardCompact lesson={lesson} pairNum={slot.num} timeSlot={slot} />
                                        ) : (
                                            <ScheduleCard lesson={lesson} pairNum={slot.num} timeSlot={slot} />
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={slot.num} className={`p-2 card-premium flex items-center justify-between border-l-4 border-l-gray-300 ${compact ? 'min-h-[44px]' : 'min-h-[80px]'}`}>
                                        <div className="flex items-center gap-2 opacity-40">
                                            <span className="font-display font-bold text-lg text-gray-400">
                                                {slot.num}
                                            </span>
                                            <span className="font-comfortaa text-xs text-gray-400">
                                                {slot.start}–{slot.end}
                                            </span>
                                        </div>
                                        <span className="font-comfortaa text-[10px] uppercase tracking-wider text-gray-400 opacity-60">
                                            Окно
                                        </span>
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DayColumn;
