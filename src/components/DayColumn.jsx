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

    return (
        <div className={`h-full ${isToday ? 'relative' : ''}`}>
            {isToday && (
                <div className="absolute -inset-1 bg-neo-pink border-3 border-black shadow-neo -z-10 rotate-1"></div>
            )}

            <div className="bg-white border-3 border-black shadow-neo h-full flex flex-col">
                <div className={`p-2 border-b-3 border-black text-center sticky top-0 z-10 ${
                    isToday ? 'bg-neo-yellow' : 'bg-gray-100'
                }`}>
                    <h2 className="font-display font-black tracking-tighter leading-none ${compact ? 'text-sm normal-case' : 'text-lg uppercase'}`">
                        {dayName}
                    </h2>
                    {isToday && (
                        <div className="mt-0.5 inline-block bg-black text-white px-1.5 py-0 text-[10px] font-black uppercase">
                            СЕГОДНЯ
                        </div>
                    )}
                </div>

                <div className="p-1.5 flex-1 overflow-y-auto space-y-1.5">
                    {lessons.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-center opacity-40">
                            <Coffee size={24} strokeWidth={3} />
                            <div className="font-black text-xs mt-1">ВЫХОДНОЙ</div>
                        </div>
                    ) : (
                        TIME_SLOTS.map((slot) => {
                            const lesson = findLesson(slot.start);

                            if (lesson) {
                                return compact ? (
                                    <ScheduleCardCompact key={slot.num} lesson={lesson} pairNum={slot.num} />
                                ) : (
                                    <ScheduleCard key={slot.num} lesson={lesson} />
                                );
                            } else {
                                return (
                                    <div
                                        key={slot.num}
                                        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-2
                             flex justify-between items-center opacity-60 h-[60px]"
                                    >
                                        <div className="flex items-center gap-1.5 font-display font-bold text-gray-400 text-sm">
                      <span className="bg-gray-300 text-gray-500 text-[10px] w-5 h-5 flex items-center justify-center border border-gray-400">
                        {slot.num}
                      </span>
                                            <span>{slot.start}-{slot.end}</span>
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Окно
                    </span>
                                    </div>
                                );
                            }
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default DayColumn;