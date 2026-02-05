import React from 'react';

const ScheduleCardCompact = ({ lesson, pairNum, timeSlot }) => {
    const mainSubject = lesson.curricula[0];
    const uniqueRooms = [...new Set(lesson.curricula.map(c => c.roomname))];
    const uniqueTeachers = [...new Set(lesson.curricula.map(c => c.teachername).filter(Boolean))];

    const shortenName = (fullName) => {
        if (!fullName) return '';
        const parts = fullName.split(' ');
        if (parts.length >= 3) {
            return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
        }
        return fullName;
    };

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
            return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', label: 'ВЕРХ' };
        }
        if (lesson.type === 'lower') {
            return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', label: 'НИЖ' };
        }
        return null;
    };

    const typeBadge = getTypeBadge();

    return (
        <div className={`p-2 card-premium transition-all ${getLeftBorder()}`}>
            {/* Header: Number, Time & Badges */}
            <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                    {/* Pair Number */}
                    <span className="font-display font-black text-xl text-gray-300">
                        {pairNum}
                    </span>
                    {/* Time */}
                    <span className="text-xs text-gray-500 font-comfortaa">
                        {timeSlot.start}–{timeSlot.end}
                    </span>
                </div>

                {/* Type badges */}
                <div className="flex gap-1">
                    {lesson.isLecture && (
                        <span className="font-comfortaa text-[9px] font-bold px-1.5 py-0.5 bg-pink-100 text-pink-800 border border-pink-300 uppercase tracking-wider">
                            Лекция
                        </span>
                    )}
                    {typeBadge && (
                        <span className={`font-comfortaa text-[9px] font-bold px-1.5 py-0.5 ${typeBadge.bg} ${typeBadge.text} border ${typeBadge.border} uppercase tracking-wider`}>
                            {typeBadge.label}
                        </span>
                    )}
                </div>
            </div>

            {/* Subject */}
            <h3 className="font-display font-bold text-sm text-gray-900 mb-1.5 leading-snug line-clamp-2">
                {mainSubject?.subjectabbr || mainSubject?.subjectname}
            </h3>

            {/* Room & Teacher Row */}
            <div className="flex flex-wrap items-center gap-1.5">
                {uniqueRooms.map((room, idx) => (
                    <span
                        key={idx}
                        className="font-display font-bold text-xs px-1.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300"
                    >
                        {room}
                    </span>
                ))}
                
                {uniqueTeachers.length === 1 ? (
                    <span className="text-xs text-gray-600 font-onest truncate">
                        {shortenName(uniqueTeachers[0])}
                    </span>
                ) : uniqueTeachers.length > 1 ? (
                    <span className="text-xs text-pink-700 font-onest font-semibold">
                        {uniqueTeachers.length} преп.
                    </span>
                ) : null}
            </div>

            {/* Subgroups */}
            {lesson.hasSubgroups && lesson.subcount <= 2 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex flex-wrap gap-1.5">
                        {lesson.curricula.map((curr, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-[10px] border border-gray-300 px-1.5 py-0.5 bg-gray-50">
                                <span className="font-display font-bold text-gray-500">#{curr.subnum}</span>
                                <span className="font-onest text-gray-700">{curr.roomname}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Subgroups count for many subgroups */}
            {lesson.subcount > 2 && (
                <div className="mt-2">
                    <span className="font-comfortaa text-[10px] font-bold px-1.5 py-0.5 bg-violet-100 text-violet-800 border border-violet-300">
                        {lesson.subcount} подгр.
                    </span>
                </div>
            )}
        </div>
    );
};

export default ScheduleCardCompact;
