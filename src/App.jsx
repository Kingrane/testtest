import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Github, LayoutGrid, List } from 'lucide-react';
import DayColumn from './components/DayColumn';
import WeekToggle from './components/WeekToggle';
import { mergeScheduleData, groupByDay, filterByWeek } from './utils/parser';

const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

function App() {
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weekType, setWeekType] = useState('all');
    const [lastUpdate, setLastUpdate] = useState(null);
    const [compactMode, setCompactMode] = useState(true);

    const fetchSchedule = async () => {
        try {
            setLoading(true);
            setError(null);

            const cached = localStorage.getItem('schedule_data');
            const cachedTime = localStorage.getItem('schedule_time');

            if (cached && cachedTime) {
                const data = JSON.parse(cached);
                setSchedule(data);
                setLastUpdate(new Date(cachedTime));
            }

            const response = await fetch(`${import.meta.env.BASE_URL}schedule.json?t=${Date.now()}`);

            if (!response.ok) {
                throw new Error('Не удалось загрузить расписание');
            }

            const data = await response.json();
            const merged = mergeScheduleData(data.lessons, data.curricula);

            localStorage.setItem('schedule_data', JSON.stringify(merged));
            localStorage.setItem('schedule_time', new Date().toISOString());

            setSchedule(merged);
            setLastUpdate(new Date());
        } catch (err) {
            console.error('Error fetching schedule:', err);
            setError('Не удалось загрузить свежее расписание. Показываем сохраненное.');
            if (!schedule) {
                setError('Нет данных. Проверьте подключение к интернету.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    const filteredSchedule = schedule ? filterByWeek(schedule, weekType) : [];
    const grouped = groupByDay(filteredSchedule);

    return (
        <div className="min-h-screen p-2 md:p-4 lg:p-6">
            <div className="max-w-[1600px] mx-auto">
                {/* Swiss Style Header */}
                <header className="mb-4 border-b-2 border-gray-900 pb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                        {/* Logo Section */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-gray-900">
                                Расписание
                            </h1>
                            <div className="flex flex-col sm:-mt-1">
                                <span className="font-display font-bold text-2xl sm:text-3xl text-rose-500">ФИИТ4</span>
                                <span className="font-comfortaa text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider">Мехмат • 1 курс</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap items-center gap-3">
                            <WeekToggle currentWeek={weekType} onChange={setWeekType} />

                            <div className="flex border border-gray-300">
                                <button
                                    onClick={() => setCompactMode(true)}
                                    className={`p-2 transition-colors ${compactMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                    title="Компактный"
                                >
                                    <LayoutGrid size={18} strokeWidth={2} />
                                </button>
                                <button
                                    onClick={() => setCompactMode(false)}
                                    className={`p-2 transition-colors ${!compactMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                    title="Подробный"
                                >
                                    <List size={18} strokeWidth={2} />
                                </button>
                            </div>

                            <button
                                onClick={fetchSchedule}
                                disabled={loading}
                                className="px-4 py-2 bg-gray-900 text-white font-display font-semibold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                <RefreshCw size={14} className={`inline mr-2 ${loading ? 'animate-spin' : ''}`} strokeWidth={2} />
                                Обновить
                            </button>

                            {lastUpdate && (
                                <span className="font-comfortaa text-xs text-gray-400">
                                    {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </div>
                    </div>
                </header>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 border-l-4 border-rose-400 bg-rose-50">
                        <span className="font-onest text-rose-700 text-sm">{error}</span>
                    </div>
                )}

                {/* Loading */}
                {loading && !schedule && (
                    <div className="flex justify-center items-center h-64">
                        <RefreshCw size={40} className="animate-spin text-gray-400" strokeWidth={1.5} />
                    </div>
                )}

                {/* Schedule Grid - Mobile: vertical scroll, Desktop: horizontal */}
                {schedule && (
                    <main>
                        {/* Mobile view: vertical stack */}
                        <div className="block xl:hidden space-y-4">
                            {dayNames.map((dayName, index) => (
                                <DayColumn
                                    key={index}
                                    dayNumber={index}
                                    dayName={dayName}
                                    lessons={grouped[index] || []}
                                    compact={compactMode}
                                />
                            ))}
                        </div>
                        {/* Desktop view: 6 columns */}
                        <div className="hidden xl:grid xl:grid-cols-6 gap-px bg-gray-300 border border-gray-300">
                            {dayNames.map((dayName, index) => (
                                <DayColumn
                                    key={index}
                                    dayNumber={index}
                                    dayName={dayName}
                                    lessons={grouped[index] || []}
                                    compact={compactMode}
                                />
                            ))}
                        </div>
                    </main>
                )}

                {/* Footer */}
                <footer className="mt-6 pt-3 border-t border-gray-200">
                    <div className="flex justify-center items-center">
                        <a
                            href="https://github.com/Kingrane/testtest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="swiss-button-secondary flex items-center gap-2"
                        >
                            <Github size={18} strokeWidth={2} />
                            <span className="font-comfortaa">GitHub</span>
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
