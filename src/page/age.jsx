// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/header";
// import "./Age.css"; // 👈 import the CSS

// const Age = () => {
//   const [secondsLeft, setSecondsLeft] = useState(0); // start from 0
//   const [day, setDay] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const [age, setAge] = useState(null);
//   const [error, setError] = useState("");
//   const [countdown, setCountdown] = useState({
//   days: 0,
//   hours: 0,
//   minutes: 0,
//   seconds: 0
// });


//    useEffect(() => {
//     if (day && month && year) {
//       const formattedMonth = month.toString().padStart(2, "0");
//       const formattedDay = day.toString().padStart(2, "0");
//       setBirthDate(`${year}-${formattedMonth}-${formattedDay}`);
//     }
//   }, [day, month, year]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://portfolio-production-2376.up.railway.app/age/", {
//         birth_date: birthDate,
//       });
//       setAge(res.data);
//       setCountdown(res.data.next_birthday_countdown);
//       // setSecondsLeft(res.data.next_birthday_countdown_seconds);
//       setError("");
//     } catch (err) {
//       setAge(null);
//       setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       // setSecondsLeft(0); // reset on error
//       setError("Invalid date or future date not allowed.");
//     }
//   };


//    // Create year options from 1900 to current year
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);
//   const days = Array.from({ length: 31 }, (_, i) => i + 1);


//   useEffect(() => {
//   if (!countdown || (countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0)) return;

//   const timer = setInterval(() => {
//     setCountdown(prev => {
//       let { days, hours, minutes, seconds } = prev;

//       if (seconds > 0) {
//         seconds -= 1;
//       } else if (minutes > 0) {
//         minutes -= 1;
//         seconds = 59;
//       } else if (hours > 0) {
//         hours -= 1;
//         minutes = 59;
//         seconds = 59;
//       } else if (days > 0) {
//         days -= 1;
//         hours = 23;
//         minutes = 59;
//         seconds = 59;
//       } else {
//         // Countdown finished
//         clearInterval(timer);
//         return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//       }

//       return { days, hours, minutes, seconds };
//     });
//   }, 1000);

//   return () => clearInterval(timer);
// }, [countdown]);



// // useEffect(() => {
// //   if (secondsLeft <= 0) return; // don't start timer if no countdown
// //   const timer = setInterval(() => {
// //     setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
// //   }, 1000);

// //   return () => clearInterval(timer);
// // }, [secondsLeft]);


//   return (
//     <>
//       <Header />      
      
//       <div className="age-container">
//         <h2>Age Calculator</h2>
        
//          <form onSubmit={handleSubmit} className="age-form">

//           {/* Dropdowns */}
//           <div className="dropdowns" >
          
//             <select value={day} onChange={(e) => setDay(e.target.value)}>
//               <option value="">Day</option>
//               {days.map((d) => (
//                 <option key={d} value={d}>{d}</option>
//               ))}
//             </select>

//             <select value={month} onChange={(e) => setMonth(e.target.value)}>
//               <option value="">Month</option>
//               {months.map((m) => (
//                 <option key={m} value={m}>{m}</option>
//               ))}
//             </select>

//             <select value={year} onChange={(e) => setYear(e.target.value)}>
//               <option value="">Year</option>
//               {years.map((y) => (
//                 <option key={y} value={y}>{y}</option>
//               ))}
//             </select>
//           </div>

//            <button type="submit">Calculate Age</button>
//         </form>



//         {age && (
//           <div className="age-result">

//             <p style={{textAlign:'left'}}><strong>Age : </strong>{age.years} Years {age.months} Months {age.days} Days</p> 
//             <p style={{textAlign:'left'}}><strong>Next_Birthday_In : </strong>{age.next_birthday_in}</p>     

//             {/* {secondsLeft > 0 ? (
//               <p style={{ textAlign: 'left' }}>
//                 <strong>Countdown (Seconds): </strong> {secondsLeft}
//               </p>
//             ) : (
//               <p style={{ textAlign: 'left', color: 'red', fontWeight: 'bold', fontSize: '18px' }}>
//                 🎉 Happy Birthday! 🎂
//               </p>
//           )}                       */}

//           {countdown && (countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0) ? (
//   <p style={{ textAlign: 'left' }}>
//     <strong>Countdown: </strong> 
//     {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
//   </p>
// ) : (
//   <p style={{ textAlign: 'left', color: 'red', fontWeight: 'bold', fontSize: '18px' }}>
//     🎉 Happy Birthday! 🎂
//   </p>
// )}

                
//           </div>
//         )}

//         {error && <p className="age-error" style={{backgroundColor:"transparent"}}>{error}</p>}
//       </div>

  
      
//     </>
//   );
// };

// export default Age;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import "./Age.css";

const Age = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (day && month && year) {
      const formattedMonth = month.toString().padStart(2, "0");
      const formattedDay = day.toString().padStart(2, "0");
      setBirthDate(`${year}-${formattedMonth}-${formattedDay}`);
    }
  }, [day, month, year]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!day || !month || !year) {
      setError("Please select your complete birth date.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://portfolio-production-2376.up.railway.app/age/",
        { birth_date: birthDate }
      );
      setAge(res.data);
      setCountdown(res.data.next_birthday_countdown);
      setError("");
    } catch (err) {
      setAge(null);
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setError("Invalid date or future date not allowed.");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
  const months = [
    { val: 1, label: "Jan" }, { val: 2, label: "Feb" }, { val: 3, label: "Mar" },
    { val: 4, label: "Apr" }, { val: 5, label: "May" }, { val: 6, label: "Jun" },
    { val: 7, label: "Jul" }, { val: 8, label: "Aug" }, { val: 9, label: "Sep" },
    { val: 10, label: "Oct" }, { val: 11, label: "Nov" }, { val: 12, label: "Dec" },
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    if (!countdown || (countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0)) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds -= 1;
        else if (minutes > 0) { minutes -= 1; seconds = 59; }
        else if (hours > 0) { hours -= 1; minutes = 59; seconds = 59; }
        else if (days > 0) { days -= 1; hours = 23; minutes = 59; seconds = 59; }
        else { clearInterval(timer); return { days: 0, hours: 0, minutes: 0, seconds: 0 }; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const isBirthday = age && countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;

  return (
    <>
      <Header />

      <div className="age-wrapper">
        
     

        <div className="age-container">
          {/* Header Section */}
          <div className="age-header">
            <div className="age-icon">🎂</div>
            <h2 className="age-title">Age Calculator</h2>
            <p className="age-subtitle">Discover how long you've been amazing</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="age-form">
            <p className="form-label">Select your date of birth</p>

            <div className="dropdowns">
              <div className="select-wrapper">
                <label className="select-label">Day</label>
                <select value={day} onChange={(e) => setDay(e.target.value)} className={day ? "filled" : ""}>
                  <option value="">--</option>
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="select-wrapper">
                <label className="select-label">Month</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)} className={month ? "filled" : ""}>
                  <option value="">--</option>
                  {months.map((m) => (
                    <option key={m.val} value={m.val}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div className="select-wrapper">
                <label className="select-label">Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className={year ? "filled" : ""}>
                  <option value="">----</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading" style={{background:'tranpsarent'}} >
                  <span className="spinner" /> Calculating...
                </span>
              ) : (
                <span style={{background:'transparent'}} >Calculate My Age →</span>
              )}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="age-error">
              <span className="error-icon">⚠️</span> {error}
            </div>
          )}

          {/* Results */}
          {age && (
            <div className="age-result">

              {/* Age Stats */}
              <div className="stat-grid">
                <div className="stat-card">
                  <span className="stat-value">{age.years}</span>
                  <span className="stat-label">Years</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{age.months}</span>
                  <span className="stat-label">Months</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{age.days}</span>
                  <span className="stat-label">Days</span>
                </div>
              </div>

              {/* Next Birthday */}
              <div className="next-birthday">
                <p className="next-birthday-label">
                  🎉 Next Birthday
                </p>
                <p className="next-birthday-in">{age.next_birthday_in}</p>
              </div>

              {/* Countdown */}
              {isBirthday ? (
                <div className="birthday-banner">
                  🎊 Happy Birthday! Wishing you an incredible day! 🎂
                </div>
              ) : (
                <div className="countdown-grid">
                  {[
                    { val: countdown.days, label: "Days" },
                    { val: countdown.hours, label: "Hours" },
                    { val: countdown.minutes, label: "Mins" },
                    { val: countdown.seconds, label: "Secs" },
                  ].map((item) => (
                    <div key={item.label} className="countdown-card">
                      <span className="countdown-value">
                        {String(item.val).padStart(2, "0")}
                      </span>
                      <span className="countdown-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Age;
