import React from 'react';

const ScheduleCard = ({ lesson, pairNum, timeSlot }) => {
    const mainSubject = lesson.curricula[0];
    const uniqueRooms = [...new Set(lesson.curricula.map(c => c.roomname))];
    const uniqueTeachers = [...new Set(lesson.curricula.map(c => c.teachername).filter(Boolean))];

    // Determine left border color based on lesson type
    const getLeftBorder = () => {
        if (lesson.isLecture) return 'border-l-4 border-rose-500';
        if (lesson.type === 'upper') return 'border-l-4 border-orange-400';
        if (lesson.type === 'lower') return 'border-l-4 border-blue-400';
        return 'border-l-4 border-gray-300';
    };

    // Determine badge color based on type
    const getTypeBadge = () => {
        if (lesson.type === 'upper') {
            return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', label: 'ВЕРХНЯЯ' };
        }
        if (lesson.type === 'lower') {
            return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', label: 'НИЖНЯЯ' };
        }
        return null;
    };

    const typeBadge = getTypeBadge();

    return (
        <div className={`p-2.5 card-premium transition-all ${getLeftBorder()}`}>
            {/* Header: Number, Time */}
            <div className="flex items-center gap-2 mb-2">
                {/* Pair Number */}
                <span className="font-display font-black text-xl text-gray-300">
                    {pairNum}
                </span>
                {/* Time */}
                <span className="text-xs text-gray-500 font-comfortaa">
                    {timeSlot.start}–{timeSlot.end}
                </span>
            </div>

            {/* Subject */}
            <h3 className="font-display font-bold text-base text-gray-900 mb-2 leading-snug">
                {mainSubject?.subjectabbr || mainSubject?.subjectname}
            </h3>
            
            {mainSubject?.subjectname && mainSubject.subjectname !== mainSubject.subjectabbr && (
                <p className="text-xs text-gray-500 mb-2 font-onest">
                    {mainSubject.subjectname}
                </p>
            )}

            {/* Room */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {uniqueRooms.map((room, idx) => (
                    <span
                        key={idx}
                        className="font-display font-bold text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300"
                    >
                        {room}
                    </span>
                ))}
            </div>

            {/* Teacher - Full Name */}
            {uniqueTeachers.length === 1 ? (
                <div className="text-sm text-gray-700 font-onest mb-2">
                    {uniqueTeachers[0]}
                    {mainSubject?.teacherdegree && (
                        <span className="text-xs text-gray-400 ml-1">({mainSubject.teacherdegree})</span>
                    )}
                </div>
            ) : uniqueTeachers.length > 1 ? (
                <div className="text-sm text-pink-700 font-onest font-semibold mb-2">
                    {uniqueTeachers.length} преподавателя
                </div>
            ) : null}

            {/* Subgroups */}
            {lesson.hasSubgroups && (
                <div className="mb-2">
                    <div className="text-[10px] text-gray-400 mb-1 font-comfortaa uppercase tracking-wider">
                        Подгруппы ({lesson.subcount})
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                        {lesson.curricula.map((curr, idx) => (
                            <div key={idx} className="text-xs border border-gray-300 px-2 py-1 bg-gray-50">
                                <span className="font-display font-bold text-gray-500">#{curr.subnum}</span>
                                <span className="font-onest text-gray-700 ml-1">{curr.roomname}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Info */}
            {lesson.info && (
                <div className="mb-2 text-sm text-gray-600 font-onest">
                    {lesson.info}
                </div>
            )}

            {/* Type badges - at the bottom */}
            <div className="flex gap-1 pt-2 border-t border-gray-200">
                {lesson.isLecture && (
                    <span className="font-comfortaa text-[9px] font-bold px-2 py-1 bg-pink-100 text-pink-800 border border-pink-300 uppercase tracking-wider">
                        Лекция
                    </span>
                )}
                {typeBadge && (
                    <span className={`font-comfortaa text-[9px] font-bold px-2 py-1 ${typeBadge.bg} ${typeBadge.text} border ${typeBadge.border} uppercase tracking-wider`}>
                        {typeBadge.label}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ScheduleCard;