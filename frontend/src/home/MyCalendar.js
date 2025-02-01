import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
 
  const [date, setDate] = useState(new Date());

  
  const plans = {
    '2025-02-04': ['Pumpkins prefer rich, well-draining soil with a slightly acidic to neutral pH','Rice requires a flooded environment for optimal growth'],
    '2025-02-12': ['Papayas thrive in well-draining, sandy loam soil. The soil should be slightly acidic with a pH between 5.5 and 6.5.'],
    '2025-01-21': ['Brinjal grows best in fertile, well-drained soil'],
    
  };

  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  
  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="container">
      <div className="my-calendar">

        <div className="calendar-wrapper">
          <Calendar
            onChange={onChange}
            value={date}
            tileClassName={({ date, view }) => {
              const dateStr = formatDate(date);
              
              if (plans[dateStr]) {
                return 'highlight';
              }
            }}
            tileContent={({ date, view }) => {
              const dateStr = formatDate(date);
              
              if (plans[dateStr]) {
                return <div className="event-count">{plans[dateStr].length}</div>;
              }
            }}
          />
        </div>

        <div className="plans-details-panel">
          <h3>Plans for {formatDate(date)}</h3>
          {plans[formatDate(date)] ? (
            <ul>
              {plans[formatDate(date)].map((plan, index) => (
                <li key={index}>{plan}</li>
              ))}
            </ul>
          ) : (
            <p>No plans for this day.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          padding-top: 120px; /* Move down a bit */
          padding-left: 130px;
        }

        .my-calendar {
          display: flex;
          margin: 0 auto;
        }

        .calendar-wrapper {
          flex: 1;
          min-width: 400px; /* Ensure the calendar has enough space */
        }

        .plans-details-panel {
          flex: 1;
          // background-color: #f4f4f9;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 350px;
        }

        .plans-details-panel h3 {
          margin-bottom: 10px;
          font-size: 1.25em;
          color: #333;
        }

        .highlight {
          background-color: #ffcc00;
        }

        .event-count {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: #ff6347; /* Tomato red color */
          color: white;
          font-size: 0.8em;
          font-weight: bold;
          border-radius: 50%;
          padding: 4px 8px;
        }

        ul {
          padding-left: 20px;
        }

        li {
          margin-bottom: 10px;
          font-size: 1em;
          color: #333;
        }

        p {
          color: #666;
          font-size: 1em;
        }
      `}</style>
    </div>
  );
};

export default MyCalendar;
