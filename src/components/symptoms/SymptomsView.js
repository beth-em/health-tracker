function SymptpmsView({ entries, deleteEntry }) {
    const symptomEntries = entries.filter(entry => entry.type === 'symptom');

    return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Symptom History</h2>
            
            {symptomEntries.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No symptoms logged yet</p>
            ) : (
              <div className="space-y-4">
                {symptomEntries
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map(entry => (
                    <div key={entry.id} className="p-4 border border-purple-100 rounded-lg bg-purple-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-medium text-purple-900">{entry.symptoms.join(', ')}</span>
                            <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                              Severity: {entry.severity}/5
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {new Date(entry.date).toLocaleDateString('en-US')} at{' '}
                            {new Date(entry.timestamp).toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                          </p>
                          {entry.notes && (
                            <p className="text-gray-700 mt-2"><strong>Notes:</strong> {entry.notes}</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </div>
      );
    }