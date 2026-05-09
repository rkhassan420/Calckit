import { useState, useEffect, useContext } from "react";
import { evaluate } from "mathjs";
import Header from "../components/header";
import './standard.css';
import { ThemeContext } from "../theme/ThemeContext";

const Standard = () => {
    const [result, setResult] = useState("");
    const [liveAnswer, setLiveAnswer] = useState("0");
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const computeLive = (expr) => {
        try {
            const res = evaluate(expr);
            if (Number.isFinite(res)) setLiveAnswer("= " + res);
        } catch {
            // keep last valid answer — no blink
        }
    };

    const handleClick = (value) => {
        const newResult = result + value;
        setResult(newResult);
        computeLive(newResult);
    };

    const allClear = () => {
        setResult("");
        setLiveAnswer("0");
    };

    const removeOne = () => {
        const newResult = result.slice(0, -1);
        setResult(newResult);
        if (!newResult) {
            setLiveAnswer("0");
        } else {
            computeLive(newResult);
        }
    };

    const calculation = () => {
        try {
            const res = evaluate(result);
            if (Number.isFinite(res)) {
                setResult(res.toString());
                setLiveAnswer("= " + res);
            }
        } catch {
            setLiveAnswer("Error");
        }
    };

    return (
        <div className="main-container">
            <Header />
            <div className="standard-container">
                <div className="display">
                    <div className="display-expression">{result || "0"}</div>
                    <div className="display-result">{liveAnswer}</div>
                </div>
                <div className="buttons">
                    <button onClick={allClear}>AC</button>
                    <button onClick={removeOne}>DEL</button>
                    <button onClick={() => handleClick('%')}>%</button>
                    <button onClick={() => handleClick('/')}>/</button>

                    {['7','8','9'].map(n => (
                        <button key={n} className="num" onClick={() => handleClick(n)}>{n}</button>
                    ))}
                    <button onClick={() => handleClick('*')}>*</button>

                    {['4','5','6'].map(n => (
                        <button key={n} className="num" onClick={() => handleClick(n)}>{n}</button>
                    ))}
                    <button onClick={() => handleClick('-')}>-</button>

                    {['1','2','3'].map(n => (
                        <button key={n} className="num" onClick={() => handleClick(n)}>{n}</button>
                    ))}
                    <button onClick={() => handleClick('+')}>+</button>

                    <button className="num" onClick={() => handleClick('00')}>00</button>
                    <button className="num" onClick={() => handleClick('0')}>0</button>
                    <button className="num" onClick={() => handleClick('.')}>.</button>
                    <button className="equal" onClick={calculation}>=</button>
                </div>
            </div>
        </div>
    );
};

export default Standard;