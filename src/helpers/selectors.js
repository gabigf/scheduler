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

  const resultsArray = apptIds.map((el) => {
    return state.appointments[el];
  });

  return resultsArray;
}