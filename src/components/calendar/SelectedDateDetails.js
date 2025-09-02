function SelectedDateDetails({ date, entries }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {newDate(date).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </h3>

            {entries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No entries for this date</p>
            ) : (
                <div className="space-y-4">
                    {entries.map(entry => (
                        <div key={entry.id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    entry.type === 'period' ? 'bg-pink-100 text-pink-800' :
                                    entry.type === 'symptom' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                }`}>
                                    {entry.type}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {new Date(entry.timestamp).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </span>
                            </div>

                            {/* Entry-specific contnet */}
                            {entry.type === 'period' && (
                                <div>
                                    <p className="text-gray-700"><strong>Flow:</strong> {entry.flow}</p>
                                    {entry.notes && <p className="text-gray-600 mt-1"><strong>Notes:</strong> {entry.notes}</p>}
                                </div>
                            )}

                            {entry.type === 'symptom' && (
                                <div>
                                    <p className="text-gray-700"><strong>Symptoms:</strong> {entry.symptoms.join(', ')}</p>
                                    <p className="text-gray-700"><strong>Severity:</strong> {entry.severity}/5</p>
                                    {entry.notes && <p className="text-gray-600 mt-1"><strong>Notes:</strong> {entry.notes}</p>}
                                </div>
                            )}

                            {entry.type === 'nutrition' && (
                                <div>
                                    <p className="text-gray-700"><strong>Food:</strong> {entry.food}</p>
                                    <p className="text-gray-700"><strong>Calories:</strong> {entry.calories}</p>
                                    {entry.notes && <p className="text-gray-600 mt-1"><strong>Notes:</strong> {entry.notes}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}