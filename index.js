import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import InfiniteCalendar from './src/index'

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

function storeDate(a,b,c)
{
console.log(a+"     /   "+b+"     /   "+c);
}

render(<InfiniteCalendar onSelect={storeDate} selectedDates={[new Date(), tomorrow]} />,
  document.getElementById('root')
)
