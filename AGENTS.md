# AGENTS.md - Coding Guidelines for AI Agents

## Project Overview
React + Vite schedule viewer app for ФИИТ4 (Mechmath, 1st year) with neo-brutalist design.

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

**Note:** No test framework, linter, or formatter is currently configured.

## Code Style Guidelines

### General
- Use ES modules (`"type": "module"` in package.json)
- React 18 with hooks
- Functional components with arrow functions
- Russian language for UI text

### Imports
```javascript
// React first
import React from 'react';

// Third-party libs (lucide-react for icons)
import { MapPin, User, Clock } from 'lucide-react';

// Components
import DayColumn from './components/DayColumn';

// Utils
import { mergeScheduleData } from './utils/parser';
```

### Naming Conventions
- Components: PascalCase (`ScheduleCard.jsx`, `DayColumn`)
- Functions: camelCase (`parseTimeslot`, `groupByDay`)
- Constants: UPPER_SNAKE_CASE (`TIME_SLOTS`, `dayNames`)
- Props: camelCase, destructure in params
- Custom hooks: camelCase starting with `use`

### Component Structure
```javascript
const ComponentName = ({ prop1, prop2 = defaultValue }) => {
    // Hooks first
    const [state, setState] = useState();
    
    // Helper functions
    const helperFn = () => {};
    
    // Effects
    useEffect(() => {}, []);
    
    return (
        <div className="tailwind-classes">
            {/* JSX */}
        </div>
    );
};

export default ComponentName;
```

### Tailwind/Styling
- Use neo-brutalist design system from `tailwind.config.js`
- Key custom colors: `neo-yellow`, `neo-pink`, `neo-blue`, `neo-green`, `neo-orange`, `neo-purple`
- Custom shadows: `shadow-neo`, `shadow-neo-hover`, `shadow-neo-sm`
- Custom components: `neo-card`, `neo-button`, `neo-button-pink`, `neo-button-blue`
- Responsive breakpoints: `sm:`, `md:`, `lg:` (mobile-first)
- Border width: `border-neo` (3px), `border-3` also used
- Use `font-display` for headings, default sans for body

### Error Handling
- Try-catch for async operations
- Console.error for debugging
- User-friendly error messages in Russian
- Error state with UI feedback (orange alert style)

### State Management
- React useState/useEffect for local state
- localStorage for persistence (schedule_data, schedule_time keys)
- Props drilling for component communication

### File Organization
```
src/
  components/     # React components
  utils/          # Helper functions
  App.jsx         # Main app component
  main.jsx        # Entry point
  index.css       # Tailwind + custom styles
public/
  schedule.json   # Data source
```

### JSX Conventions
- Use self-closing tags when no children
- Multi-line props: each prop on new line for 3+ props
- ClassName strings: group related classes
- Comments in Russian for code context
- Inline styles avoided in favor of Tailwind

### Data Patterns
- Schedule data merged from lessons + curricula
- Time slots hardcoded as constants
- Week types: 'all', 'upper', 'lower'
- Day numbering: 0=Monday through 6=Sunday

### Performance
- React.memo not currently used
- List keys use index or unique IDs
- Lazy loading not configured

### Git

#### Safe Experimentation Workflow (Ветки)
```bash
# Создать новую ветку для экспериментов
git checkout -b design-experiment

# Переключаться между ветками
git checkout main          # вернуться к стабильной версии
git checkout design-experiment  # обратно к экспериментам

# Посмотреть все ветки
git branch -a

# Удалить ветку если не понравилось
git checkout main
git branch -D design-experiment

# Смержить в main если понравилось
git checkout main
git merge design-experiment
```

#### Stash (временное сохранение)
```bash
# Сохранить текущие изменения без коммита
git stash push -m "название изменений"

# Посмотреть список stash
git stash list

# Вернуть последние изменения
git stash pop

# Вернуть конкретный stash
git stash apply stash@{1}
```

#### Откат изменений
```bash
# Отменить последний коммит (если не пушили)
git reset --hard HEAD~1

# Отменить изменения в файле до последнего коммита
git checkout -- src/App.jsx

# Отменить все незакоммиченные изменения
git checkout -- .

# Ядерный вариант - откат к любому моменту
git reflog                  # увидеть все действия
git reset --hard abc1234    # откат к конкретному коммиту

# Если уже запушили - безопасный откат
git revert HEAD            # создаёт "обратный" коммит
git push
```

#### Правило: Работай в ветке design-experiment, main - для стабильной версии
- Already ignored: node_modules, dist, .env, *.log, AGENTS.md
