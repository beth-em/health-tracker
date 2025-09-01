import { useState, useEffect } from 'react';
import { Calendar, Plus, Activity, Apple, TrendingUp, X } from 'lucide-react';

export default function HealthTrackerApp() {

  // State management for all app data
  const [activeTab, setActiveTab] = useState('dashboard');    // Current active tab
  const [entries, setEntries] = useState([]);                 // All health entries
  const [showModal, setShowModal] = useState(false);          // Modal visibility
  const [selectedDate, setSelectedDate] = useState(new Date().toISOSString().split('T')[0]);    // Current selected date

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('healthEntries') || '[]');
    setEntries(savedEntries);
  }, []);

  // Save data to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('healthEntries', JSON.stringify(entries));
  }, [entries]);

  // Function to add a new health entry
  const addEntry = (newEntry) => {
    const entry = {
      id: Date.now(),
      date: selectedDate,
      timestamp: new Date().toISOSString(),
      ...newEntry
    };

    // Function to delete an entry
    const deleteEntry = (id) => {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    };

    // Get entries for a specific date
    const getEntriesForDate = (date) => {
      return entries.filter(entry => entry.date === date);
    };

    // Get the most recent cycle data for predictions
    const getRecentCycleData = () => {
      const periodEntries = entries.filter(entry => entry.type === 'period');
      return periodEntries.slice(-2);     // Get last 2 period entries for cycle calculation
    };
}

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-pink-500" />
                <h1 className="text-2xl font-bold text-gray-900">Health Tracker</h1>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Entry</span>
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'calendar', label: 'Calendar', icon: Calendar },
                { id: 'symptoms', label: 'Symptoms', icon: Activity },
                { id: 'nutrition', label: 'Nutrition', icon: Apple },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-pink-500 text-pink-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {activeTab === 'dashboard' && <Dashboard entries={entries} />}
          {activeTab === 'calendar' && <CalendarView entries={entries} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
          {activeTab === 'symptoms' && <SymptomsView entries={entries} deleteEntry={deleteEntry} />}
          {activeTab === 'nutrition' && <NutritionView entries={entries} deleteEntry={deleteEntry} />}
        </main>

        {/* Add Entry Modal */}
        {showModal && (
          <AddEntryModal
            selectedDate={selectedDate}
            onClose={() => setShowModal(false)}
            onAddEntry={addEntry}
          />
        )}
      </div>
    );
  }