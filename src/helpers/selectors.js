// Function to find and return an array of appointments for a specified day
export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }

  const selectedDay = state.days.filter(currDay => {
    return currDay.name === day;
  });

  if (selectedDay.length === 0) {
    return [];
  }

  const apptIds = selectedDay[0].appointments;

  const resultsArray = apptIds.map(el => state.appointments[el]);

  return resultsArray;
}


// Function to return an object that contains the interview data
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  const newObj = { student: interview.student };

  newObj.interviewer = state.interviewers[interview.interviewer];

  return newObj;
}


// Function to find and return an array of interviewers for a specified day
export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const selectedDay = state.days.filter((currDay) => {
    return currDay.name === day;
  });

  if (selectedDay.length === 0) {
    return [];
  }

  const interviewerIds = selectedDay[0].interviewers;

  const resultsArray = interviewerIds.map(el => state.interviewers[el]);

  return resultsArray;
}
