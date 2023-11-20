import React, { useState } from "react";

function HourToMinuteCalculator() {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");

    const handleConvert = () => {
        if (hours !== "") {
            const convertedMinutes = parseInt(hours) * 60;
            setMinutes(convertedMinutes);
        } else {
            setMinutes("");
        }
    };

    return (
        <div className="hour-to-minute-calculator calculator">
        <div className="hour-to-minute-calculator">
            <h2 className="calculator-hdl">Hours to Minutes Calculator</h2>
            <input
                className="calculator-input"
                type="number"
                placeholder="Enter hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleConvert()}
            />
            <button onClick={handleConvert}
            className="calculator-btn">Calculate</button>
            {minutes !== "" && (
                <p>
                    {hours} hour(s) is equal to {minutes} minute(s).
                </p>
            )}
        </div>
        </div>
    );
}

export default HourToMinuteCalculator;