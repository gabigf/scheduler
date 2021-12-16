import classNames from "classnames";
import 'components/DayListItem.scss';



export default function DayListItem(props) {
  const { setDay } = props;

  const formatSpots = spots => {
    if (!spots) {
      return `no spots remaining`;
    } 
    if (spots === 1) {
      return `1 spot remaining`;
    }
    return `${spots} spots remaining`;
  }

  const formattedSpots = formatSpots(props.spots);

  let dayClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  return (
    <li
      className={dayClass}
      onClick={()=>{setDay(props.name)}}
      selected={props.selected}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formattedSpots}</h3>
    </li>
  );
}