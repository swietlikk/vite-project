import React, { useState } from "react";

const TimeCalculator = () => {
    const [minutes, setMinutes] = useState("");
    const [result, setResult] = useState({ hours: 0, minutes: 0 });

    const handleCalculate = () => {
        const totalMinutes = parseInt(minutes);
        if (!isNaN(totalMinutes) && totalMinutes >= 0) {
            const hours = Math.floor(totalMinutes / 60);
            const remainingMinutes = totalMinutes % 60;
            setResult({ hours, minutes: remainingMinutes });
        } else {
            setResult({ hours: 0, minutes: 0 });
        }
    };

    return (
        <div className="time-calculator calculator">
        <div className="time-calculator">
            <h2>Minutes to Hours Calculator</h2>
            <input
                type="number"
                placeholder="Enter minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleCalculate()}
            />
            <button onClick={handleCalculate}>Calculate</button>
            <p>
                {result.hours > 0 && `${result.hours}h`} {result.minutes > 0 && `${result.minutes}min`}
            </p>
        </div>
        </div>
    );
}

export default TimeCalculator;