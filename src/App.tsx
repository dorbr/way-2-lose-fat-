import { useState, useEffect } from 'react';
import WeightInput from './components/WeightInput';
import ProgressGraph from './components/ProgressGraph';
import BodyFatCalculator from './components/BodyFatCalculator';
import {
  getWeights,
  saveBodyFatEntry,
  getBodyFatEntries,
  type WeightEntry,
  type BodyFatEntry
} from './services/storage';
import './App.css';

function App() {
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [bodyFatEntries, setBodyFatEntries] = useState<BodyFatEntry[]>([]);

  useEffect(() => {
    setWeights(getWeights());
    setBodyFatEntries(getBodyFatEntries());
  }, []);

  const handleWeightAdded = (updatedWeights: WeightEntry[]) => {
    setWeights(updatedWeights);
  };

  const handleBodyFatSaved = (entry: BodyFatEntry) => {
    const updatedEntries = saveBodyFatEntry(entry);
    setBodyFatEntries(updatedEntries);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weight Monitor</h1>
        <p>Track your progress, achieve your goals.</p>
      </header>

      <main className="app-content">
        <section className="card input-section">
          <h2>Add New Entry</h2>
          <WeightInput onWeightAdded={handleWeightAdded} />
        </section>

        <section className="card graph-section">
          <h2>Weight Progress</h2>
          {weights.length > 0 ? (
            <ProgressGraph
              data={weights.map(w => ({ date: w.date, value: w.weight }))}
              label="Weight (kg)"
              title="Weight Over Time"
            />
          ) : (
            <div className="empty-state">
              <p>No data yet. Add your first weight entry to see the graph!</p>
            </div>
          )}
        </section>

        <section className="card calculator-section">
          <h2>Body Fat Calculator</h2>
          <BodyFatCalculator onSave={handleBodyFatSaved} />
        </section>

        <section className="card graph-section">
          <h2>Body Fat Progress</h2>
          {bodyFatEntries.length > 0 ? (
            <ProgressGraph
              data={bodyFatEntries.map(e => ({ date: e.date, value: e.percentage }))}
              label="Body Fat (%)"
              title="Body Fat Percentage Over Time"
              color="rgb(255, 99, 132)"
            />
          ) : (
            <div className="empty-state">
              <p>No body fat data yet. Calculate and save your body fat to see the graph!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
