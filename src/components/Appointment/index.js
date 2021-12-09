import '../Appointment/styles.scss';

export default function Appointment(props) {
  return (
    <article className="appointment">
      {!props.time && <p>No appointments</p>}
      {props.time && <p>Appointment at {props.time}</p>}
    </article>
  );
}
