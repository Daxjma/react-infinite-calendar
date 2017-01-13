import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
const style = require('./Header.scss');
const animation = require('./Animation.scss');

export default class Header extends Component {
	static propTypes = {
		layout: PropTypes.string,
		locale: PropTypes.object,
		onClick: PropTypes.func,
		selectedDates: PropTypes.arrayOf(PropTypes.object),
		shouldHeaderAnimate: PropTypes.bool,
		theme: PropTypes.object,
		display: PropTypes.string
	};
	shouldComponentUpdate(nextProps) {
		return shallowCompare(this, nextProps);
	}
	render() {
		let {display, layout, locale, scrollToDate, selectedDates, setDisplay, shouldHeaderAnimate, theme} = this.props;
		let values = selectedDates && [
			{
				item: 'year',
				value: selectedDates.year(),
				active: (display === 'years'),
				title: (display === 'days') ? `Change year` : null,
				handleClick: (e) => {
					e && e.stopPropagation();
					setDisplay('years');
				}
			},
			{
				item: 'day',
				key: selectedDates.format('YYYYMMDD'),
				value: selectedDates.format(locale.headerFormat),
				active: (display === 'days'),
				title: (display === 'days') ? `Scroll to ${selectedDates.format(locale.headerFormat)}` : null,
				handleClick: (e) => {
					e && e.stopPropagation();

					if (display !== 'days') {
						setDisplay('days');
					} else if (selectedDates) {
						scrollToDate(selectedDates, -40);
					}
				}
			}
		];

		return (
			<div className={classNames(style.root, {[style.blank]: !selectedDates, [style.landscape]: layout == 'landscape'})} style={theme && {backgroundColor: theme.headerColor, color: theme.textColor.active}}>
				{(selectedDates) ?
					<div className={style.wrapper} aria-label={selectedDates.format(locale.headerFormat + ' YYYY')}>
						{values.map(({handleClick, item, key, value, active, title}) => {
							return (
								<div key={item} className={classNames(style.dateWrapper, style[item], {[style.active]: active})} title={title}>
									<ReactCSSTransitionGroup transitionName={animation} transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionEnter={shouldHeaderAnimate} transitionLeave={shouldHeaderAnimate}>
										<span key={`${item}-${key || value}`} className={style.date} aria-hidden={true} onClick={handleClick}>
											{value}
										</span>
									</ReactCSSTransitionGroup>
								</div>
							);
						})}
					</div>
				: <div className={style.wrapper}>{locale.blank}</div>}
			</div>
		);
	}
}
