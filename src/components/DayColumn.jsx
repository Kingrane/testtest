import React from 'react';
import ScheduleCard from './ScheduleCard';

const DayColumn = ({ dayNumber, dayName, lessons }) => {
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;
    const isToday = adjustedToday === dayNumber;

    return (
        <div className={`h-full ${isToday ? 'relative' : ''}`}>
            {isToday && (
                <div className="absolute -inset-1 bg-neo-pink border-3 border-black shadow-neo -z-10 rotate-1"></div>
            )}

            <div className="bg-white border-3 border-black shadow-neo h-full flex flex-col">
                <div className={`p-4 border-b-3 border-black text-center ${
                    isToday ? 'bg-neo-yellow' : 'bg-gray-100'
                }`}>
                    <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
                        {dayName}
                    </h2>
                    {isToday && (
                        <div className="mt-1 inline-block bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">
                            Сегодня
                        </div>
                    )}
                </div>

                <div className="p-3 flex-1 overflow-y-auto">
                    {lessons.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-center opacity-50">
                            <div className="text-4xl mb-2">☕</div>
                            <div className="font-bold text-sm">Нет занятий</div>
                        </div>
                    ) : (
                        lessons.map((lesson) => (
                            <ScheduleCard key={lesson.id} lesson={lesson} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DayColumn;