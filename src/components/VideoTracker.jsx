import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./VideoTracker.css"; // Ensure the path is correct

const VideoTracker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [viewByDay, setViewByDay] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(7); // Default to 7 days for 'This Week'
  const [isCustomRange, setIsCustomRange] = useState(false); // State to track if in custom range mode
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State to track calendar visibility
  const [isCustom, setIsCustom] = useState(false); 


  useEffect(() => {
    const today = new Date();

    // Fonction pour générer des données pour la période sélectionnée
    const generateRandomData = (numPoints) => Array.from({ length: numPoints }, () => Math.floor(Math.random() * 1000));

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      const ctx = document.getElementById('myChart').getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(67, 121, 238, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.01)');

      const config = {
        type: 'line',
        data: {
          labels: Array.from({ length: numberOfDays }, (_, i) => i + 1),
          datasets: [{
            label: 'Chiffre d\'affaire',
            data: generateRandomData(numberOfDays),
            backgroundColor: gradient,
            borderColor: '#4379EE',
            borderWidth: 2,
            fill: true,
            pointBackgroundColor: '#4379EE',
            pointBorderColor: '#4379EE',
            pointRadius: 3
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stacked: true,
              grid: {
                color: '#ffffff00',
              },
              ticks: {
                color: '#202224',
              }
            },
            x: {
              grid: {
                color: '#ffffff00',
              },
              ticks: {
                color: '#202224',
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      };

      let myChart = new window.Chart(ctx, config);

      let selectedTimePeriod = document.getElementById('time-period');

      document.querySelector('.custom_range_btn').addEventListener('click', () => {
        setIsCalendarVisible(true);
        setIsCustomRange(true);
        setViewByDay(true);
        selectedTimePeriod.value = 'customRange';
        setIsCustom(true);
      });
      

      selectedTimePeriod.addEventListener('change', (e) => {
        const selectedOption = e.target.value;
        switch (selectedOption) {
          case 'thisWeek':
            setNumberOfDays(7);
            setIsCustomRange(false);
            setIsCustom(false);
            break;
          case 'lastTwoWeeks':
            setNumberOfDays(14);
            setIsCustomRange(false);
            setIsCustom(false);
            break;
          case 'thisMonth':
            setNumberOfDays(new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate());
            setIsCustomRange(false);
            setIsCustom(false);
            break;
          case 'customRange':
            setIsCustomRange(true);
            setIsCustom(true);
            break;
          default:
            setNumberOfDays(7);
        }
      });

      return () => {
        document.body.removeChild(script);
        myChart.destroy();
      };
    });

  }, [startDate, endDate, viewByDay, numberOfDays, isCustomRange]);


  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setViewByDay(true);
    setIsCalendarVisible(false);
    const daysBetweenDates = (end - start) / (1000 * 60 * 60 * 24) + 1;
    setNumberOfDays(daysBetweenDates);
    if (!isCalendarVisible) {
      setIsCustomRange(false);
      setIsCustom(true);
    }
  };


  return (
    <div>
      {/* Bannière sur toute la largeur */}
      <div className="banner">
        <div className="banner-content">
          <h1 className="banner-title">Product Database</h1>
          <p className="banner-subtitle">
            Search millions of products and see their revenue
          </p>
        </div>
        <div className="banner-buttons">
          <button className="banner-button">Take Tour</button>
          <button className="banner-button">Watch Tutorial</button>
        </div>
      </div>

      {/* Section de recherche et catégories */}
      {/* <div className="container">
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Price | Min"
              className="search-input"
            />
            <input type="text" placeholder="Max" className="search-input" />
          </div>
          <div className="categories">
            <div className="category">Appliances</div>
            <div className="category">Arts Crafts & Sewing</div>
          </div>
        </div>
      </div> */}

      {/* Graphique */}
      <section className="dashboard-container">
      
        <div className="graph">
          <div className="graph-title-container">
            <h3>Title</h3>
            <div className="date-select">
              <div className="custom_range">
                <button className="custom_range_btn">Custom Range</button>
                <div className="view-toggle">
                {isCustomRange && (
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                  />
                )}
              </div>
              </div>
              <select name="time-period" id="time-period" onChange={(e) => setViewByDay(e.target.value === 'thisWeek')}>
                <option value="thisWeek">This Week</option>
                <option value="lastTwoWeeks">Last Two Weeks</option>
                <option value="thisMonth">This Month</option>
                {isCustom && (
                  <option value="customRange">Custom</option>
                )}
              </select>
            </div>
          </div>
          <div className="grap">
            <canvas className="income-graph" id="myChart"></canvas>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoTracker;
