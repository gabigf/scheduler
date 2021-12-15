import { useState, useEffect } from "react";
import axios from 'axios';

 export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const updateSpots = function (state, appointments, id) {
    // Find and return days with specified id
    const dayObj = state.days.find(day => day.appointments.includes(id));
    console.log(`Day object: ${dayObj}`);
  
    // Filter through the dayObj appointments to return a new array with all
    // the appointments that have the value of null (Open Appointments)
    const openAppointments = dayObj.appointments.filter(apptId => {
      return appointments[apptId].interview === null;
    });
    console.log(`Open Appointments: ${openAppointments}`);
    
    // Maps through the state.days and modifies the amount of spots
    // available and returns a new array
    const modifiedDays = state.days.map(day => {
      const spots = openAppointments.length;
      return (day.name === dayObj.name) ? {...day, spots } : {...day};
    });
    
    return modifiedDays;
  };

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview: appointment.interview
    })
    .then(res => {
      setState({
        ...state,
        appointments
      });
    })
    .then(() => {
      const days = updateSpots(state, appointments, id);
      setState({...state, appointments, days});
    });
  }

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        setState({
          ...state,
          appointments
        });
      })
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({...state, appointments, days});
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
