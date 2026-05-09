import { useState, useCallback } from "react";
import Header from "../components/header";
import "./length.css";

const UNITS = [
  { key: "mm",  label: "Millimeter",  symbol: "mm"  },
  { key: "cm",  label: "Centimeter",  symbol: "cm"  },
  { key: "m",   label: "Meter",       symbol: "m"   },
  { key: "km",  label: "Kilometer",   symbol: "km"  },
  { key: "in",  label: "Inch",        symbol: "in"  },
  { key: "ft",  label: "Foot",        symbol: "ft"  },
  { key: "yd",  label: "Yard",        symbol: "yd"  },
  { key: "mi",  label: "Mile",        symbol: "mi"  },
  { key: "nmi", label: "Nautical Mi", symbol: "nmi" },
  { key: "ly",  label: "Light Year",  symbol: "ly"  },
];

// All values relative to 1 meter
const TO_METER = {
  mm:  0.001,
  cm:  0.01,
  m:   1,
  km:  1000,
  in:  0.0254,
  ft:  0.3048,
  yd:  0.9144,
  mi:  1609.344,
  nmi: 1852,
  ly:  9.461e15,
};

const convert = (value, from, to) => {
  if (value === "" || isNaN(value)) return "";
  const meters = parseFloat(value) * TO_METER[from];
  const result = meters / TO_METER[to];
  if (result === 0) return "0";
  if (Math.abs(result) >= 1e12 || (Math.abs(result) < 1e-6 && result !== 0)) {
    return result.toExponential(6);
  }
  // up to 10 significant digits, trimmed
  return parseFloat(result.toPrecision(10)).toString();
};

const Length = () => {
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit,   setToUnit]   = useState("ft");
  const [inputVal, setInputVal] = useState("");

  const outputVal = convert(inputVal, fromUnit, toUnit);

  const handleSwap = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (outputVal !== "") setInputVal(outputVal);
  }, [fromUnit, toUnit, outputVal]);

  const handleFromUnit = (key) => {
    setFromUnit(key);
    setInputVal("");
  };

  const handleToUnit = (key) => {
    setToUnit(key);
  };

  return (
    <div className="length-wrapper">
      <Header />

      <div className="length-container">

        {/* ── Header ── */}
        <div className="length-header">
          <span className="length-icon">📐</span>
          <h1 className="length-title">Length</h1>
          <p className="length-subtitle">Convert any unit of length instantly</p>
        </div>

        {/* ── Converter card ── */}
        <div className="length-card" style={{background:'transparent'}} > 

          {/* FROM row */}
          <div className="conv-row"  >
            <label className="conv-label">From</label>
            <div className="conv-body">
              <input
                className="conv-input"
                type="number"
                placeholder="0"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <select
                className="conv-select"
                value={fromUnit}
                onChange={(e) => handleFromUnit(e.target.value)}
              >
                {UNITS.map((u) => (
                  <option key={u.key} value={u.key}>
                    {u.symbol} — {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap button */}
          <div className="swap-row">
            <div className="swap-line" />
            <button className="swap-btn" onClick={handleSwap} title="Swap units">
              ⇅
            </button>
            <div className="swap-line" />
          </div>

          {/* TO row */}
          <div className="conv-row"  >
            <label className="conv-label">To</label>
            <div className="conv-body">
              <div className="conv-output">
                {outputVal !== "" ? outputVal : <span className="conv-placeholder">0</span>}
              </div>
              <select
                className="conv-select"
                value={toUnit}
                onChange={(e) => handleToUnit(e.target.value)}
              >
                {UNITS.map((u) => (
                  <option key={u.key} value={u.key}>
                    {u.symbol} — {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* ── Quick reference grid ── */}
        <div className="ref-title">Common Conversions</div>
        <div className="ref-grid"  >
          {[
            { from: "1 km",  to: "0.6214 mi"  },
            { from: "1 mi",  to: "1.6093 km"  },
            { from: "1 m",   to: "3.2808 ft"  },
            { from: "1 ft",  to: "0.3048 m"   },
            { from: "1 in",  to: "2.54 cm"    },
            { from: "1 cm",  to: "0.3937 in"  },
          ].map((r) => (
            <div className="ref-card" key={r.from} style={{background:'transparent'}} > 
              <span className="ref-from">{r.from}</span>
              <span className="ref-arrow">→</span>
              <span className="ref-to">{r.to}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Length;