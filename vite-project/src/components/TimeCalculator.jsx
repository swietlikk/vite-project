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


}

export default TimeCalculator;