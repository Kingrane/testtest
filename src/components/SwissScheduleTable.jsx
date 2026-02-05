import React from 'react';
import { MapPin, User, Users } from 'lucide-react';

const TIME_SLOTS = [
    { start: '08:00', end: '09:35', num: 1, duration: '1ч 35м' },
    { start: '09:50', end: '11:25', num: 2, duration: '1ч 35м' },
    { start: '11:55', end: '13:30', num: 3, duration: '1ч 35м' },
    { start: '13:45', end: '15:20', num: 4, duration: '1ч 35м' },
    { start: '15:50', end: '17:25', num: 5, duration: '1ч 35м' },
    { start: '17:40', end: '19:15', num: 6, duration: '1ч 35м' },
    { start: '19:30', end: '21:05', num: 7, duration: '1ч 35м' },
];

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const SwissScheduleTable = ({ schedule, weekType }) => {
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;

    // Filter by week type
    const filteredSchedule = weekType === 'all' 
        ? schedule 
        : schedule.filter(item => item.type === 'full' || item.type === weekType);

    // Find lesson for specific day and time
    const findLesson = (dayIndex, slotStart) => {
        return filteredSchedule.find(l => l.day === dayIndex && l.start === slotStart);
    };

    const shortenName = (fullName) => {
        if (!fullName) return '';
        const parts = fullName.split(' ');
        if (parts.length >= 3) {
            return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
        }
        return fullName;
    };

    return (
        <div className="swiss-card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="swiss-table">
                    <thead>
                        <tr>
                            <th className="w-24">Время</th>
                            {dayNames.map((day, index) => (
                                <th key={index} className={adjustedToday === index ? 'text-purple-600' : ''}>
                                    <span className={`day-header-swiss ${adjustedToday === index ? 'today' : ''}`}>
                                        {day}
                                    </span>
                                    {adjustedToday === index && (
                                        <span className="ml-2 text-[10px] font-comfortaa bg-purple-100 text-purple-600 px-2 py-1">
                                            СЕГОДНЯ
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TIME_SLOTS.map((slot) => (
                            <tr key={slot.num}>
                                {/* Time Column */}
                                <td className="bg-gray-50/50">
                                    <div className="time-slot">{slot.num}</div>
                                    <div className="font-comfortaa text-sm text-gray-600 mt-1">
                                        {slot.start}
                                    </div>
                                    <div className="time-duration">{slot.duration}</div>
                                </td>

                                {/* Day Columns */}
                                {dayNames.map((_, dayIndex) => {
                                    const lesson = findLesson(dayIndex, slot.start);
                                    
                                    if (!lesson) {
                                        return (
                                            <td key={dayIndex}>
                                                <div className="slot-empty-swiss"></div>
                                            </td>
                                        );
                                    }

                                    const mainSubject = lesson.curricula[0];
                                    const uniqueRooms = [...new Set(lesson.curricula.map(c => c.roomname))];
                                    const uniqueTeachers = [...new Set(lesson.curricula.map(c => c.teachername).filter(Boolean))];

                                    let cardClass = 'lesson-grid-card';
                                    if (lesson.type === 'upper') cardClass += ' type-upper';
                                    if (lesson.type === 'lower') cardClass += ' type-lower';
                                    if (lesson.isLecture) cardClass += ' type-lecture';

                                    return (
                                        <td key={dayIndex}>
                                            <div className={cardClass}>
                                                {/* Subject */}
                                                <h4 className="font-display font-bold text-sm text-gray-900 mb-2 line-clamp-2">
                                                    {mainSubject?.subjectabbr || mainSubject?.subjectname}
                                                </h4>

                                                {/* Room & Type */}
                                                <div className="flex flex-wrap gap-1.5 mb-2">
                                                    {uniqueRooms.map((room, idx) => (
                                                        <span key={idx} className="badge badge-room">
                                                            <MapPin size={10} className="inline mr-1" />
                                                            {room}
                                                        </span>
                                                    ))}
                                                    {lesson.type !== 'full' && (
                                                        <span className={`badge ${lesson.type === 'upper' ? 'badge-upper' : 'badge-lower'}`}>
                                                            {lesson.type === 'upper' ? 'ВЕРХ' : 'НИЖ'}
                                                        </span>
                                                    )}
                                                    {lesson.isLecture && (
                                                        <span className="badge badge-lecture">ЛЕК</span>
                                                    )}
                                                </div>

                                                {/* Teacher */}
                                                {uniqueTeachers.length === 1 ? (
                                                    <div className="flex items-center gap-1 text-xs text-gray-600 font-onest">
                                                        <User size={12} />
                                                        {shortenName(uniqueTeachers[0])}
                                                    </div>
                                                ) : uniqueTeachers.length > 1 ? (
                                                    <div className="flex items-center gap-1 text-xs text-pink-600 font-onest">
                                                        <Users size={12} />
                                                        {uniqueTeachers.length} преподавателя
                                                    </div>
                                                ) : null}

                                                {/* Subgroups */}
                                                {lesson.hasSubgroups && lesson.subcount <= 3 && (
                                                    <div className="mt-2 pt-2 border-t border-gray-100">
                                                        <div className="text-[10px] text-gray-400 font-comfortaa uppercase tracking-wider mb-1">
                                                            Подгруппы
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {lesson.curricula.map((curr, idx) => (
                                                                <span key={idx} className="text-[10px] bg-gray-100 px-2 py-1 font-onest">
                                                                    #{curr.subnum}: {curr.roomname}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SwissScheduleTable;
