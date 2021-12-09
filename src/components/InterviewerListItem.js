import 'components/InterviewerListItem.scss'
import classNames from 'classnames';

const InterviewerListItem = props => {
  const InterviewerClass = classNames('interviewers__item', {
    "interviewers__item--selected": props.selected
  });


  return (
    <li 
      className={InterviewerClass}
      onClick={(e => props.setInterviewer(props.id))}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;
