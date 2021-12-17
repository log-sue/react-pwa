import React, { useState, useEffect } from 'react';
import CalendarGrid from "./formCal";
import moment from 'moment'
import axios from 'axios';
import { Main } from './'

function BookCalendar() {
    // const today = new Date()
    // useEffect =>
    // axios =>
    // req = today.year, today.month
    // res = [{image, contentId, day} ... ]

    const [monthData, setMonthData] = useState(undefined)
    const [date, setDate] = useState(new Date())
    const [view, setView] = useState(undefined)

    useEffect(() => {
        axios.post('http://localhost:4000/contents/monthData',
        {
            'year': date.getFullYear(),
            'month': date.getMonth() + 1
        },
        {
            withCredentials: true
        })
        .then(res =>{
            setMonthData(res.data.monthData)
            console.log(res.data.monthData)
        })
    },[])

    const CalHandler = (CalDate) =>{
        setDate(CalDate)
    }

    const ViewHandler = (contentId, year, month, day) => {
        setView({
            'year' : year,
            'month' : month,
            'day' : day
        })
    }

    if(monthData===undefined){
        return(
            <div>
                loading ...
            </div>
        ) 
    }

    if(view===undefined){
        return <CalendarGrid monthData={monthData} ViewHandler={ViewHandler} year={date.getFullYear()} month={date.getMonth() + 1}/>
    }
    else{
        return <Main view={view} />
    }

    
}

export default BookCalendar;