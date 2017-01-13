¥import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import InfiniteCalendar from './src/index'

let today = new Date();
let storeDate = function(date, isselected, selectedDates) {
    console.log(selectedDates);
};

render(
    <InfiniteCalendar theme={{
    selectionColor: 'rgb(6, 5, 6)',
    textColor: {
        default: '#333',
        active: '#FFF'
    },
    weekdayColor: 'rgb(49, 44, 49)',
    headerColor: 'rgb(6, 5, 6)',
    floatingNav: {
        background: 'rgb(6, 5, 6)',
        color: '#FFF',
        chevron: '#FFA726'
    }
}} layout='portrait' width={'100%'} height={300} rowHeight={55} min={today} onSelect={storeDate} keyboardSupport={true}/>,
document.getElementById('root')
)
