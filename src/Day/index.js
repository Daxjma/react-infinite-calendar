import React from 'react';
const style = require('./Day.scss');

export default function Day({tooltipTitle, showTooltip, currentYear, date, day, handleDayClick, isDisabled, isToday, isSelected, monthShort, locale, theme}) {
	var {date: mmt, yyyymmdd} = date;
	var year = mmt.year();

	var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	var d = date.date.toDate();

	var classes = []
	classes.push(style.root)
	classes.push(isToday ? style.today : '')
	classes.push(isSelected ? style.selected : '')
	classes.push(isDisabled ? style.disabled : style.enabled)

	classes.push(showTooltip ? style.tipEnabled : '')

	return (
		<li
			style={(isToday) ? {color: theme.todayColor} : null, (!isDisabled) ? {background: theme.dayEnabled.background} : null}
			className={classes.join(' ')}
			data-date={yyyymmdd}
			onClick={(!isDisabled && handleDayClick) ? handleDayClick.bind(this, mmt) : null}
			>

			{(day === 1) && <span className={style.month}>{monthShort}</span>}
			<span className={style.simpleDay}>{day}</span>
			{(day === 1 && currentYear !== year) && <span className={style.year}>{year}</span>}
			{isSelected && renderSelectedDayContents(locale, isToday, day, monthShort, theme)}

			<p className={style.tooltip}>{tooltipTitle}</p>

		</li>
	);
}

function renderSelectedDayContents(locale, isToday, day, monthShort, theme) {
	return (
		<div className={style.selection} style={{backgroundColor: (typeof theme.selectionColor == 'function') ? theme.selectionColor(mmt) : theme.selectionColor, color: theme.textColor.active, background: theme.daySelected.background}}>
			<span className={style.month}>{(isToday) ? (locale.todayLabel.short || locale.todayLabel.long) : monthShort}</span>
			<span className={style.day} style={theme.day}>{day}</span>
		</div>
	);
}
