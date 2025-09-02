function CalendarView({ entries, selectedDate, setSelectedDate }) {
    // Get current month info
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Generate Calendar Days
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentYear + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Create array of days for calendar grid
    const calendarDays = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendayDays.push(day);
    }

    // Helper function to get date string
    const getDateString = (day) => {
        return `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    };

    // Helper function to check if date has entries
    const hasEntries = (day) => {
        if (!day) return false;
        const dateString = getDateString(day);
        return entries.some(entry => entry.date === dateString);
    };

    // Helper function to get entry types for a day
    const getEntryTypes = (day) => {
        if (!day) return [];
        const dateString = getDateString(day);
        const dayEntries = entries.filter(entry => entry.date === dateString);
        return[...new Set(dayEntries.map(entry => entry.type))];
    };

    return (
        <div className="space-y-6">
            {/* Calendar Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => {
                        if (!day) {
                            return <div key={index} className="p-3"></div>;
                        }

                        const dateString = getDateString(day);
                        const isSelected = dateString === selectedDate;
                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                        const dayHasEntries = hasEntries(day);
                        const entryTypes = getEntryTypes(day);

                        return (
                            <button
                                key={day}
                                onClick={() => setSelectedDate(dateString)}
                                className={`p-3 text-center rounded-lg border-2 transition-all relative ${
                                    isSelected
                                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                                    : isToday
                                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                                    : dayHasEntries
                                    ? 'border-gray-200 bg-gray-50 hover:border-pink-200 hover:bg-pink-50'
                                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                <span className="font-medium">{day}</span>
                                {dayHasEntries && (
                                    <div className="flex justify-center space-x-1 mt-1">
                                        {entryTypes.map(type => (
                                            <div
                                                key={type}
                                                className={`w-2 h-2 rounded-full ${
                                                    type === 'period' ? 'bg-pink-500' :
                                                    type === 'symptom' ? 'bg-purple-500' : 'bg-green-500'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Select Date Details */}
            <SelectedDateDetails date={selectedDate} entries={entries.filter(entry => entry.date === selectedDate)} />
        </div>
    );
}