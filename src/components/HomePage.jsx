import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./HomePage.css";
import data from './dataExemple.json';

const HomePage = ({ user }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [viewByDay, setViewByDay] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(7); // Default to 7 days for 'This Week'
  const [isCustomRange, setIsCustomRange] = useState(false); // State to track if in custom range mode
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State to track calendar visibility
  const [isCustom, setIsCustom] = useState(false); 
  const [openDetailsIndex, setOpenDetailsIndex] = useState(null);
  const [titleStartDate, setTitleStartDate] = useState('');
  const [titleEndDate, setTitleEndDate] = useState('');
  const [isContactPopupVisible, setIsContactPopupVisible] = useState(false);
  const [isVideoPopupVisible, setIsVideoPopupVisible] = useState(false);
  const [isDetailSlideVisible, setIsDetailSlideVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(data.user.campaigns.length - 1);
  const [selectedCampaignInfo, setSelectedCampaignInfo] = useState(data.user.campaigns[data.user.campaigns.length - 1]);
  const [viewsData, setViewsData] = useState([]);
  const [viewby24h, setViewBy24h] = useState(false);
  const [sessionsData, setSessionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");


  // Set default date range to last 7 days
  useEffect(() => {
    const today = new Date();
    setTitleStartDate(getFormattedDate(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)));
    setTitleEndDate(getFormattedDate(today));
  }, []);

  
  useEffect(() => {
    if (selectedCampaignInfo) {
      if (viewby24h) {
        const selectedDate = getFormattedDate(startDate);
        const selectedDayData = selectedCampaignInfo.sessionsLast30Days.find(day => day.date === selectedDate);
        if (selectedDayData && selectedDayData.viewsPerHour) {
          const viewsPerHourData = selectedDayData.viewsPerHour.map(hourData => hourData.views);
          setViewsData(viewsPerHourData);
        }
      } else {
        const totalViewsPerDay = selectedCampaignInfo.sessionsLast30Days.map(day => {
          return day.viewsPerHour.reduce((acc, hour) => acc + hour.views, 0);
        });
  
        setViewsData(totalViewsPerDay.slice(-numberOfDays));
      }
    }
  }, [selectedCampaignInfo, startDate, endDate, numberOfDays]);
  


  useEffect(() => {
    const today = new Date();

    const ctx = document.getElementById('myChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(67, 121, 238, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
  
    const config = {
      type: 'line',
      data: {
        labels: viewby24h ? Array.from({ length: 24 }, (_, i) => `${i}:00`) : selectedCampaignInfo.sessionsLast30Days.slice(-numberOfDays).map(day => day.date),
        datasets: [{
          label: 'Views',
          data: viewsData,
          backgroundColor: gradient,
          borderColor: '#00228F',
          borderWidth: 2,
          fill: true,
          pointStyle: 'circle',
          pointBackgroundColor: '#00228F',
          pointBorderColor: '#00228F',
          pointRadius: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#FF5733',
          pointHoverBorderColor: '#FF5733',
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
        hover: {
          mode: 'nearest',
          intersect: true,
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
          setViewBy24h(false);
          setTitleStartDate(getFormattedDate(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)));
          setTitleEndDate(getFormattedDate(today));
          break;
        case 'lastTwoWeeks':
          setNumberOfDays(14);
          setIsCustomRange(false);
          setIsCustom(false);
          setViewBy24h(false);
          setTitleStartDate(getFormattedDate(new Date(today.getTime() - 13 * 24 * 60 * 60 * 1000)));
          setTitleEndDate(getFormattedDate(today));
          break;
        case 'thisMonth':
          const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          setNumberOfDays(lastDayOfMonth.getDate());
          setIsCustomRange(false);
          setIsCustom(false);
          setViewBy24h(false);
          setTitleStartDate(getFormattedDate(new Date(today.getFullYear(), today.getMonth(), 1)));
          setTitleEndDate(getFormattedDate(lastDayOfMonth));
          break;
        case 'customRange':
          setIsCustomRange(true);
          setIsCustom(true);
          break;
        default:
          setNumberOfDays(7);
          setTitleStartDate(getFormattedDate(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)));
          setTitleEndDate(getFormattedDate(today));
      }
    });


    const handlePointClick = (event) => {
      const points = myChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
      if (points.length) {
        toggleCloseDetails(event);
        const { index } = points[0]; // Obtenir l'index du premier point cliqué
        const dataLabels = myChart.data.labels;
        const selectedDateIndex = dataLabels.length > index ? index : dataLabels.length - 1; // S'assurer que l'index ne dépasse pas la longueur des labels
        const selectedDate = dataLabels[selectedDateIndex];
        const selectedDayData = selectedCampaignInfo.sessionsLast30Days.find(day => day.date === selectedDate);
        if (selectedDayData) {
          setSessionsData(selectedDayData.sessions);
          setSelectedDate(selectedDate);
        }
      }
    };
    


    const canvas = document.getElementById('myChart');
    canvas.addEventListener('click', handlePointClick);
    
    return () => {
      myChart.destroy();
      canvas.removeEventListener('click', handlePointClick);
    };
    
  
  }, [startDate, endDate, viewByDay, numberOfDays, isCustomRange, viewsData]);

  
  

  // date format
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };




  // handle date change on calendar
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setViewByDay(true);
    setIsCalendarVisible(false);
  
    if (start && end) {
      const daysBetweenDates = (end - start) / (1000 * 60 * 60 * 24) + 1;
      if ((end - start) === 0) {
        setViewBy24h(true);
        setNumberOfDays(24);
        setTitleStartDate(getFormattedDate(start));
        setTitleEndDate(getFormattedDate(end));
      } else {
        setViewBy24h(false);
        setNumberOfDays(daysBetweenDates);
        setTitleStartDate(getFormattedDate(start));
        setTitleEndDate(getFormattedDate(end));
      }
    }
  
    if (!isCalendarVisible) {
      setIsCustomRange(false);
      setIsCustom(true);
    }
  };
  
  




  // chacked campaign
  const handleRadioChange = (index) => {
    setSelectedCampaign(index);
    setSelectedCampaignInfo(data.user.campaigns[index]);
  
    const totalViewsPerDay = data.user.campaigns[index].sessionsLast30Days.map(day => {
      return day.viewsPerHour.reduce((acc, hour) => acc + hour.views, 0);
    });
  
    setViewsData(totalViewsPerDay.slice(-numberOfDays));
  };
  
  




  // open details of one session
  const toggleDetails = (index) => {
    setOpenDetailsIndex((prevIndex) => (prevIndex === index ? null : index));
    const allDetailContents = document.querySelectorAll('.graph_point_detail_content');
    allDetailContents.forEach((detailContent, i) => {
      if (i === index && openDetailsIndex !== index) {
        detailContent.style.height = detailContent.scrollHeight + 'px';
      } else {
        detailContent.style.height = '0px';
      }
    });
  };








  // open sessions list
  const toggleCloseDetails = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setIsDetailSlideVisible(!isDetailSlideVisible);
  };
  // contact pop-up
  const toggleContactPopup = (event) => {
    event.stopPropagation();
    setIsContactPopupVisible(!isContactPopupVisible);
  };
  // youtube tutorial video pop-up
  const toggleVideoPopup = (event) => {
    event.stopPropagation();
    setIsVideoPopupVisible(!isVideoPopupVisible);
  };
  const handleClickOutside = (event) => {
    const videoPopUp = document.querySelector('.video_pop_up_content');
    const contactPopUp = document.querySelector('.contact_pop_up_content');
    const graphPointDetails = document.querySelector('.graph_point_details_container');

    if (videoPopUp && !videoPopUp.contains(event.target) && isVideoPopupVisible) {
      setIsVideoPopupVisible(false);
    }

    if (contactPopUp && !contactPopUp.contains(event.target) && isContactPopupVisible) {
      setIsContactPopupVisible(false);
    }

    if (graphPointDetails && !graphPointDetails.contains(event.target) && isDetailSlideVisible) {
      setIsDetailSlideVisible(false);
      console.log('click outside slide hidden');
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVideoPopupVisible, isContactPopupVisible, isDetailSlideVisible]);
  





  // pagination
  const sessionsPerPage = 7;
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sessionsData.slice(indexOfFirstSession, indexOfLastSession);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sessionsData.length / sessionsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);





  // percentage bar width
  useEffect(() => {
    const updatePercentageBarWidth = () => {
      const percentageBars = document.querySelectorAll('.graph_point_detail_perc_bar .perc');
      percentageBars.forEach((percentageBar, index) => {
        const percentage = document.querySelectorAll('.perc_number')[index].innerText;
        percentageBar.style.width = percentage + '%';
      });
    };
    updatePercentageBarWidth();
  }, [sessionsData]);

  

  return (
    <div className='video_tracker_page'>
      {/* Pop-up de la vidéo YouTube */}
      <div className={`video_pop_up ${isVideoPopupVisible ? '' : 'hide_video_pop_up'}`}>
        <div className="video_pop_up_content">
          <i className="fa fa-times close" aria-hidden="true" onClick={toggleVideoPopup}></i>
          <h2>VideoTracker Tutorial</h2>
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/oJuP-4Hsvkg?si=gzN_yN6GHlPSznEL" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
          <p>In your VideoTracker page ...</p>
        </div>
      </div>


      {/* Pop-up de contact */}
      <div className={`contact_pop_up ${isContactPopupVisible ? '' : 'hide_contact_pop_up'}`}>
        <div className="contact_pop_up_content">
          <i className="fa fa-times close" aria-hidden="true" onClick={toggleContactPopup}></i>
          <textarea placeholder='Put your message here' rows={5} cols={50}></textarea>
          <button type='submit' onClick={toggleContactPopup}>Submit</button>
        </div>
      </div>


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
          <button className="banner-button" onClick={toggleVideoPopup}>Watch Tutorial</button>
        </div>
      </div>

      {/* main content */}
      <section className="dashboard-container">
        <div className="campaign_list_container">
          <div className="campaign_list">
            {data.user.campaigns.slice().reverse().map((campaign, index) => (
              <label className="campaign_list_card" htmlFor={`campaign-${index}`} key={index}>
                <input
                  type="radio"
                  name="campaign"
                  id={`campaign-${index}`}
                  checked={selectedCampaign === data.user.campaigns.length - 1 - index}
                  onChange={() => handleRadioChange(data.user.campaigns.length - 1 - index)}
                />
                <div className="campaign_list_card_title_container">
                  <h4>{campaign.name}</h4>
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </div>
              </label>
            ))}
          </div>
        </div>


      
        {/* Graphique */}
        {selectedCampaignInfo && (
          <div className="graph">
            <div className="graph-title-container">
              <h3>{selectedCampaignInfo.name}
                <span className='graph_choosed_date_start'>{titleStartDate}</span>
                <span>-</span>
                <span className='graph_choosed_date_end'>{titleEndDate}</span>
              </h3>
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
            <div>
              <canvas className="income-graph" id="myChart"></canvas>
            </div>
          </div>
        )}
      </section>

      {/* Campaign point details */}
      <div className={`graph_point_details_container ${isDetailSlideVisible ? '' : 'hide'}`}>
        <div className="graph_point_details_list">
          <i className="fa fa-times close" aria-hidden="true" onClick={toggleCloseDetails}></i>
          <h2>Analytics of <span>{selectedDate}</span></h2>

          {/* details */}
          {currentSessions.map((session, sessionIndex) => (
            <div className="graph_point_detail" key={sessionIndex}>
              <div className="graph_point_detail_header" onClick={() => toggleDetails(sessionIndex)}>
                <span className="graph_point_detail_title">{selectedDate} {session.id}</span>
                <div className="graph_point_detail_perc_bar_container">
                  <p><span className="perc_number">{session.viewsPerc}</span> %</p>
                  <div className="graph_point_detail_perc_bar">
                    <div className='perc'></div>
                  </div>
                </div>
                <i className={`fa fa-chevron-down ${openDetailsIndex === sessionIndex && "rotate"}`} aria-hidden="true"></i>
              </div>
              <div className={`graph_point_detail_content graph_point_detail_content_${sessionIndex} ${openDetailsIndex === sessionIndex && "open_details"}`}>
                <div className='graph_point_detail_content_data'>
                  <p>Clicked at <span className='played_at'>{selectedDate} {session.clickedSession}</span></p>
                  <div className='click_play_line'>
                    <div className='line'></div>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                  </div>
                  <p>Played at <span className='played_at'>{selectedDate} {session.playedSession}</span></p>
                  <div className='play_finish_line'>
                    <div className='line'></div>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                  </div>
                  <p>Finished at <span className='finished_at'>{selectedDate} {session.finishedSession}</span></p>
                </div>
                <div className='download_button_container'>
                  <div className='download_button data'>
                    <i className="fa fa-download" aria-hidden="true"></i>
                    <p>data</p>
                  </div><div className='download_button all_data'>
                    <i className="fa fa-download" aria-hidden="true"></i>
                    <p>all data</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* pages */}
          <ul className="graph_point_details_page_list">
            {pageNumbers.map((number) => (
              <li className="graph_point_details_page" key={number}>
                <button onClick={() => paginate(number)} className={currentPage === number ? 'selected' : ''}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>




      {/* campagin infos container */}
      <div className='campaign_details_conainer'>
        {selectedCampaignInfo && (
          <div className='campaign_details'>
            <div className='header_campaign_container'>
              <div className='status_container'>
                <p>Status: <span className='status'>{selectedCampaignInfo.status}</span></p>
              </div>
              <div className='credit_container'>
                <p>Credit Used: <span className='credit'>{selectedCampaignInfo.credit}</span></p>
              </div>
              <div className='campaign_id_container'>
                <p>Campaign ID: <span className='campaign_id'>{selectedCampaignInfo.id}</span></p>
              </div>
            </div>

            {/* campagin infos */}
            <div className='infos_campaign_container'>
              <div className='views_campaign campaign_width'>
                <div className='icon_container'>
                  <p>Opened</p>
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </div>
                <p className='views campaign_info_value'>{selectedCampaignInfo.openedNumber}</p>
              </div>
              <div className='start_campaign campaign_width'>
                <div className='icon_container'>
                  <p>Started</p>
                  <i className="fa fa-play" aria-hidden="true"></i>
                </div>
                <p className='start campaign_info_value'>{selectedCampaignInfo.startedNumber}</p>
                <div className='more_info_container'>
                  <p className='title'>Open to Start Rate</p>
                  <p className='start_rate perc'>{selectedCampaignInfo.openToStartRate}</p>
                </div>
              </div>
              <div className='end_campaign campaign_width'>
                <div className='icon_container'>
                  <p>Ended</p>
                  <i className="fa fa-flag" aria-hidden="true"></i>
                </div>
                <p className='end campaign_info_value'>{selectedCampaignInfo.endedNumber}</p>
                <div className='more_info_container'>
                  <p className='title'>Start to End Rate</p>
                  <p className='end_rate perc'>{selectedCampaignInfo.startToEndRate}</p>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* campagin options */}
        <div className='campaign_options_container'>
          <div className='campaign_options_title'>
            <i className="fa fa-cog fa-spin fa-2x fa-fw"></i>
            <span className="sr-only">Loading...</span>
            <p className='setting_title'>Campaign Settings</p>
          </div>
          <div className='campaign_options'>
            <div className='setting_button' onClick={toggleContactPopup}>
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <p>Contact us</p>
            </div>
            <div className='setting_button'>
              <i className="fa fa-download" aria-hidden="true"></i>
              <p>download all data</p>
            </div>
            <div className='setting_button'>
              <i className="fa fa-link" aria-hidden="true"></i>
              <p>Change Calendly Link</p>
            </div>
            <div className='setting_button'>
              <i className="fa fa-trash" aria-hidden="true"></i>
              <p>Delete All Flows</p>
            </div>
          </div>
        </div>

      </div>

      
    </div>
  );
};

export default HomePage;
