import { useState } from "react";
import Header from "../components/header";
import './per.css';

const Percentage = () => {
    const [percent, setPercent] = useState("");
    const [ofValue, setOfValue] = useState("");
    const [result1, setResult1] = useState(null);

    const [value, setValue] = useState("");
    const [total, setTotal] = useState("");
    const [result2, setResult2] = useState(null);

    const [increaseValue, setIncreaseValue] = useState("");
    const [increasePercent, setIncreasePercent] = useState("");
    const [result3, setResult3] = useState(null);

    const calculatePercentageOf = () => {
        if (percent !== "" && ofValue !== "") {
            const res = (parseFloat(percent) / 100) * parseFloat(ofValue);
            setResult1(res.toFixed(2));
        }
    };

    const calculateWhatPercent = () => {
        if (value !== "" && total !== "") {
            const res = (parseFloat(value) / parseFloat(total)) * 100;
            setResult2(res.toFixed(2));
        }
    };

    const calculateIncrease = () => {
        if (increaseValue !== "" && increasePercent !== "") {
            const res = parseFloat(increaseValue) * (1 + parseFloat(increasePercent) / 100);
            setResult3(res.toFixed(2));
        }
    };

    return (
        <div className="main-container">
            <Header />

            <div className="per-main-container">
                <h1 className="per-title">Percentage Calculator</h1>

                {/* Card 1 — What is X% of Y */}
                <div className="per-box">
                    <p className="per-label">What is <span>X%</span> of a number?</p>
                    <div className="per-row">
                        <input
                            className="per-input"
                            type="number"
                            placeholder="e.g. 25"
                            value={percent}
                            onChange={(e) => setPercent(e.target.value)}
                        />
                        <span className="per-unit">%  of</span>
                        <input
                            className="per-input"
                            type="number"
                            placeholder="e.g. 200"
                            value={ofValue}
                            onChange={(e) => setOfValue(e.target.value)}
                        />
                    </div>
                    <button className="per-btn" onClick={calculatePercentageOf}>
                        Calculate
                    </button>
                    {result1 && (
                        <div className="per-result">
                            = <span>{result1}</span>
                        </div>
                    )}
                </div>

                {/* Card 2 — X is what % of Y */}
                <div className="per-box">
                    <p className="per-label"><span>X</span> is what percent of <span>Y</span>?</p>
                    <div className="per-row">
                        <input
                            className="per-input"
                            type="number"
                            placeholder="e.g. 50"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <span className="per-unit">is what % of</span>
                        <input
                            className="per-input"
                            type="number"
                            placeholder="e.g. 200"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </div>
                    <button className="per-btn" onClick={calculateWhatPercent}>
                        Calculate
                    </button>
                    {result2 && (
                        <div className="per-result">
                            = <span>{result2}%</span>
                        </div>
                    )}
                </div>

                {/* Card 3 — Percentage increase/decrease */}
                <div className="per-box">
                    <p className="per-label">Percentage <span>increase / decrease</span></p>
                    <div className="per-row">
                        <input
                            className="per-input"
                            type="number"
                            placeholder="Value e.g. 100"
                            value={increaseValue}
                            onChange={(e) => setIncreaseValue(e.target.value)}
                        />
                        <span className="per-unit">by</span>
                        <input
                            className="per-input"
                            type="number"
                            placeholder="% e.g. 20"
                            value={increasePercent}
                            onChange={(e) => setIncreasePercent(e.target.value)}
                        />
                        <span className="per-unit">%</span>
                    </div>
                    <button className="per-btn" onClick={calculateIncrease}>
                        Calculate
                    </button>
                    {result3 && (
                        <div className="per-result">
                            = <span>{result3}</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Percentage;