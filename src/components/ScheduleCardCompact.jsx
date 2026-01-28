import React from 'react';
import { MapPin, User, Clock, Users } from 'lucide-react';

const ScheduleCardCompact = ({ lesson }) => {
    const mainSubject = lesson.curricula[0];

    // Получаем УНИКАЛЬНЫЕ кабинеты (чтобы не дублировать если совпадают)
    const uniqueRooms = [...new Set(lesson.curricula.map(c => c.roomname))];

    // Получаем УНИКАЛЬНЫХ преподов (для случая когда 2 подгруппы - разные преподы)
    const uniqueTeachers = [...new Set(lesson.curricula.map(c => c.teachername).filter(Boolean))];

    // Сокращаем имя
    const shortenName = (fullName) => {
        if (!fullName) return '';
        const parts = fullName.split(' ');
        if (parts.length >= 3) {
            return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
        }
        return fullName;
    };

    // Цвет карточки по типу
    const getCardBg = () => {
        if (lesson.isLecture) return 'bg-neo-cold';
        if (lesson.hasSubgroups) return 'bg-white';
        if (lesson.type === 'upper') return 'bg-neo-yellow';
        if (lesson.type === 'lower') return 'bg-neo-pink';
        return 'bg-white';
    };

    return (
        <div className={`${getCardBg()} border-2 border-black shadow-neo-sm hover:shadow-neo 
                    transition-all duration-150 mb-2 rounded group cursor-pointer
                    hover:-translate-x-0.5 hover:-translate-y-0.5 overflow-hidden`}>

            {/* Верхняя полоса: время и аудиторИИ (все!) */}
            <div className="flex justify-between items-start border-b-2 border-black px-2 py-1 bg-gray-50">
                <div className="flex items-center gap-1 font-display font-black text-sm pt-0.5">
                    <Clock size={14} strokeWidth={3} />
                    <span>{lesson.start}-{lesson.end}</span>
                </div>

                {/* АУДИТОРИИ - все сразу */}
                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                    {uniqueRooms.length > 0 ? (
                        uniqueRooms.map((room, idx) => (
                            <div
                                key={idx}
                                className={`text-xs font-black px-1.5 py-0.5 border-2 border-black shadow-neo-sm
                  ${idx % 2 === 0 ? 'bg-neo-yellow' : 'bg-neo-pink'} 
                  transform ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'} 
                  group-hover:rotate-0 transition-transform`}
                            >
                                {room}
                            </div>
                        ))
                    ) : (
                        <span className="text-[10px] font-bold opacity-50">Нет ауд.</span>
                    )}
                </div>
            </div>

            {/* Контент */}
            <div className="p-2">
                {/* Название предмета */}
                <h3 className="font-display font-black text-sm leading-tight mb-1 line-clamp-2">
                    {mainSubject?.subjectabbr || mainSubject?.subjectname}
                </h3>

                {/* Если подгрупп больше 1 - показываем "2 подгруппы" */}
                {lesson.subcount > 1 && (
                    <div className="flex items-center gap-1 text-[10px] font-bold mb-1 bg-neo-green w-fit px-1.5 py-0.5 border border-black">
                        <Users size={10} strokeWidth={3} />
                        {lesson.subcount} подгрупп
                    </div>
                )}

                {/* Преподаватели: если один - сокращенно, если несколько - "2 преподавателя" */}
                <div className="text-xs font-bold mb-1 space-y-0.5">
                    {uniqueTeachers.length === 1 ? (
                        <div className="flex items-center gap-1">
                            <User size={12} strokeWidth={3} />
                            <span className="truncate">{shortenName(uniqueTeachers[0])}</span>
                        </div>
                    ) : uniqueTeachers.length > 1 ? (
                        <div className="flex items-center gap-1 text-neo-pink">
                            <User size={12} strokeWidth={3} />
                            <span>{uniqueTeachers.length} преподавателя</span>
                        </div>
                    ) : null}
                </div>

                {/* Детали по подгруппам (только если навести или если мало подгрупп) */}
                {lesson.hasSubgroups && lesson.subcount <= 4 && (
                    <div className="mt-1.5 space-y-1 border-t border-black border-dashed pt-1.5">
                        {lesson.curricula.map((curr, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[10px] border-l-2 border-black pl-1.5">
                                <div className="flex items-center gap-1">
                                    <span className="bg-black text-white px-1 font-black">#{curr.subnum}</span>
                                    <span className="truncate max-w-[80px]">
                    {curr.teachername ? shortenName(curr.teachername) : 'Нет преподавателя'}
                  </span>
                                </div>
                                <span className="font-black bg-gray-100 px-1 border border-black">
                  {curr.roomname}
                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Бейджи типа занятия */}
                <div className="flex gap-1 flex-wrap mt-1.5">
                    {lesson.isLecture && (
                        <span className="bg-black text-white text-[9px] font-black px-1.5 py-0.5 border border-black">
              ЛЕКЦИЯ
            </span>
                    )}
                    {lesson.type !== 'full' && (
                        <span className={`${lesson.type === 'upper' ? 'bg-neo-yellow' : 'bg-neo-pink'} 
                             text-[9px] font-black px-1.5 py-0.5 border border-black`}>
              {lesson.type === 'upper' ? 'ВЕРХНЯЯ' : 'НИЖНЯЯ'}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScheduleCardCompact;