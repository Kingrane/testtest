import React, {useState, useEffect} from 'react';
import {RefreshCw, AlertCircle, Github, LayoutGrid, List} from 'lucide-react';
import DayColumn from './components/DayColumn';
import WeekToggle from './components/WeekToggle';
import {mergeScheduleData, groupByDay, filterByWeek} from './utils/parser';

const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

function App() {
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weekType, setWeekType] = useState('all');
    const [lastUpdate, setLastUpdate] = useState(null);
    const [compactMode, setCompactMode] = useState(true); // По умолчанию компактно!

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
        <div className="min-h-screen bg-neo-gray p-2 md:p-4">
            <header className="max-w-[1600px] mx-auto mb-4">
                <div className="bg-white border-3 border-black shadow-neo p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">

                        {/* Левая часть */}
                        <div>
                            <h1 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight">
                                РАСПИСАНИЕ <span className="text-neo-pink">ФИИТ4</span>
                            </h1>
                            <p className="font-bold text-gray-600 text-sm mt-0.5">
                                Мехмат • 1 курс
                            </p>
                        </div>

                        {/* Правая часть - контролы */}
                        <div className="flex flex-wrap items-center gap-2">
                            <WeekToggle currentWeek={weekType} onChange={setWeekType}/>

                            {/* ПЕРЕКЛЮЧАТЕЛЬ ВИДА */}
                            <div className="flex bg-gray-100 border-2 border-black rounded p-0.5">
                                <button
                                    onClick={() => setCompactMode(true)}
                                    className={`p-1.5 border-2 transition-all ${
                                        compactMode
                                            ? 'bg-neo-yellow border-black shadow-neo-sm'
                                            : 'border-transparent hover:bg-white'
                                    }`}
                                    title="Компактный вид"
                                >
                                    <LayoutGrid size={18} strokeWidth={3}/>
                                </button>
                                <button
                                    onClick={() => setCompactMode(false)}
                                    className={`p-1.5 border-2 transition-all ${
                                        !compactMode
                                            ? 'bg-neo-yellow border-black shadow-neo-sm'
                                            : 'border-transparent hover:bg-white'
                                    }`}
                                    title="Карточки"
                                >
                                    <List size={18} strokeWidth={3}/>
                                </button>
                            </div>

                            <button
                                onClick={fetchSchedule}
                                disabled={loading}
                                className="neo-button text-xs flex items-center gap-1.5 rounded py-2 px-3"
                            >
                                <RefreshCw size={14} className={loading ? 'animate-spin-neo' : ''} strokeWidth={3}/>
                                <span className="hidden sm:inline">Обновить</span>
                            </button>

                            {lastUpdate && (
                                <div
                                    className="text-[10px] font-bold text-gray-500 bg-white border-2 border-black px-2 py-1">
                                    {lastUpdate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {error && (
                <div className="max-w-7xl mx-auto mb-6">
                    <div
                        className="bg-neo-orange text-white border-3 border-black shadow-neo p-4 rounded-lg flex items-center gap-3">
                        <AlertCircle size={24} strokeWidth={3}/>
                        <span className="font-bold">{error}</span>
                    </div>
                </div>
            )}

            {loading && !schedule && (
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <div
                            className="bg-neo-yellow border-3 border-black shadow-neo p-6 rounded-lg animate-pulse-neo">
                            <RefreshCw size={32} className="animate-spin-neo" strokeWidth={3}/>
                        </div>
                    </div>
                </div>
            )}

            {schedule && (
                <main className="max-w-[1600px] mx-auto">
                    {/* На мобильных - 1 колонка, планшет - 2, десктоп - 6 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        {dayNames.map((dayName, index) => (
                            <DayColumn
                                key={index}
                                dayNumber={index}
                                dayName={dayName}
                                lessons={grouped[index] || []}
                                compact={compactMode}  // Передаем режим
                            />
                        ))}
                    </div>
                </main>
            )}

            <footer className="max-w-7xl mx-auto mt-12 mb-6">
                <div className="flex justify-center items-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
                    <a
                        href="https://github.com/Kingrane/testtest"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-button-pink text-sm flex items-center gap-2 py-2 px-4"
                    >
                        <Github size={16} strokeWidth={3}/>
                        GitHub
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default App;