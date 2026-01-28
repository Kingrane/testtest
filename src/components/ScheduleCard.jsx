import React from 'react';
import { MapPin, User, Clock, Users, BookOpen } from 'lucide-react';

const ScheduleCard = ({ lesson }) => {
    const getCardColor = () => {
        if (lesson.isLecture) return 'bg-neo-blue text-white';
        if (lesson.hasSubgroups) return 'bg-neo-green';
        if (lesson.type === 'upper') return 'bg-neo-yellow';
        if (lesson.type === 'lower') return 'bg-neo-pink';
        return 'bg-white';
    };

    const mainSubject = lesson.curricula[0];

    return (
        <div className={`neo-card rounded-lg overflow-hidden mb-4 ${getCardColor()}`}>
            <div className="border-b-3 border-black p-3 flex justify-between items-center bg-opacity-20 bg-black">
                <div className="flex items-center gap-2 font-display font-bold text-lg">
                    <Clock size={20} strokeWidth={3} />
                    <span>{lesson.start} – {lesson.end}</span>
                </div>
                <div className="flex gap-2">
                    {lesson.type !== 'full' && (
                        <span className={`neo-badge text-xs ${
                            lesson.type === 'upper' ? 'bg-neo-yellow' : 'bg-neo-pink'
                        }`}>
              {lesson.type === 'upper' ? 'Верхняя' : 'Нижняя'}
            </span>
                    )}
                    {lesson.isLecture && (
                        <span className="neo-badge bg-neo-orange text-white">
              Лекция
            </span>
                    )}
                </div>
            </div>

            <div className="p-4">
                <div className="mb-3">
                    <h3 className="font-display font-bold text-xl mb-1 leading-tight">
                        {mainSubject?.subjectabbr || mainSubject?.subjectname || 'Неизвестно'}
                    </h3>
                    <p className="text-sm opacity-80 font-medium">
                        {mainSubject?.subjectname}
                    </p>
                </div>

                <div className="space-y-2 mb-3">
                    {mainSubject?.teachername && (
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <User size={16} strokeWidth={2.5} />
                            <span>{mainSubject.teachername}</span>
                            {mainSubject.teacherdegree && (
                                <span className="text-xs opacity-75">({mainSubject.teacherdegree})</span>
                            )}
                        </div>
                    )}

                    {mainSubject?.roomname && (
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <MapPin size={16} strokeWidth={2.5} />
                            <span>Ауд. {mainSubject.roomname}</span>
                        </div>
                    )}
                </div>

                {lesson.hasSubgroups && (
                    <div className="mt-3 pt-3 border-t-2 border-black border-dashed">
                        <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                            <Users size={16} strokeWidth={2.5} />
                            <span>Подгруппы ({lesson.subcount}):</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {lesson.curricula.map((curr, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white bg-opacity-90 border-2 border-black p-2 rounded text-xs font-bold shadow-neo-sm"
                                >
                                    <div className="text-neo-pink">#{curr.subnum}</div>
                                    <div className="truncate">{curr.roomname}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {lesson.info && (
                    <div className="mt-3 pt-2 border-t-2 border-black opacity-75 text-sm font-bold">
                        ℹ️ {lesson.info}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleCard;