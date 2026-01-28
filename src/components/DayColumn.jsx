import React from 'react';
import ScheduleCard from './ScheduleCard';
import ScheduleCardCompact from './ScheduleCardCompact';
import { Coffee } from 'lucide-react';

const DayColumn = ({ dayNumber, dayName, lessons, compact = false }) => {
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;
    const isToday = adjustedToday === dayNumber;

    return (
        <div className={`h-full ${isToday ? 'relative' : ''}`}>
            {isToday && (
                <div className="absolute -inset-1 bg-neo-pink border-3 border-black shadow-neo -z-10 rotate-1"></div>
            )}

            <div className="bg-white border-3 border-black shadow-neo h-full flex flex-col">
                {/* Заголовок - компактнее */}
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

                {/* Список занятий */}
                <div className="p-1.5 flex-1 overflow-y-auto space-y-1.5">
                    {lessons.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-24 text-center opacity-40">
                            <Coffee size={24} strokeWidth={3} />
                            <div className="font-black text-xs mt-1">НЕТ</div>
                        </div>
                    ) : (
                        lessons.map((lesson) =>
                            compact ? (
                                <ScheduleCardCompact key={lesson.id} lesson={lesson} />
                            ) : (
                                <ScheduleCard key={lesson.id} lesson={lesson} />
                            )
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default DayColumn;