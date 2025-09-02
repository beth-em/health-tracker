function Dashboard({ entries }) {
    // Calculate cycle insights
    const periodEntries = entries.filter(entry => entry.type === 'period');
    const symptomEntries = entries.filter(entry => entry.type === 'symptom');
    const nutritionEntries = entries.filter(entry => entry.type === 'nutrition');

    // Get recent entries for quick overview
    const recentEntries = entries
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Period Entries</p>
                            <p className="text-3xl font-bold text-pink-600">{periodEntries.length}</p>
                        </div>
                        <div className="p-3 bg-pink-100 rounded-full">
                            <Calendar className="h-6 w-6 text-pink-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Symptoms Tracked</p>
                            <p className="text-3xl font-bold text-purple-600">{symptomEntries.length}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Activity className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Nutrition Logs</p>
                            <p className="text-3xl font-bold text-green-600">{nutritionEntries.length}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <Apple className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                {recentEntries.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No entries yet. Start by adding your first entry!</p>
                ) : (
                    <div className="space-y-3">
                        {recentEntries.map(entry => (
                            <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-full ${
                                        entry.type === 'period' ? 'bg-pink-100' :
                                        entry.type === 'symptom' ? 'bg-purple-100' : 'bg-green-100'
                                    }`}>
                                        {entry.type === 'period' && <Calendar className="h-4 w-4 text-pink-600" />}
                                        {entry.type === 'symptom' && <Activity className="h-4 w-4 text-purple-600" />}
                                        {entry.type === 'nutrition' && <Apple className="h-4 w-4 text-green-600" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 capitalize">{entry.type}</p>
                                        <p className="text-sm text-gray-500">{entry.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {entry.type === 'period' && <span className="text-sm text-gray-600">Flow: {entry.flow}</span>}
                                    {entry.type === 'symptom' && <span className="text-sm text-gray-600">{entry.symptoms.join(', ')}</span>}
                                    {entry.type === 'nutrition' && <span className="text-sm text-gray-600">{entry.food}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
            </div>
        </div>
    );
}