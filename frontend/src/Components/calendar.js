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
    const [date, setDate] = useState({ year : new Date().getFullYear(), month : new Date().getMonth()+1 })
    const [view, setView] = useState(undefined)

    useEffect(() => {

        console.log(date)

        axios.post('http://localhost:4000/contents/monthData',
        {
            'year': date.year,
            'month': date.month
        },
        {
            withCredentials: true
        })
        .then(res =>{
            setMonthData(res.data.monthData)
            console.log(res.data.monthData)
        })
    },[date])

    const CalHandler = (year, month) =>{
        setDate({'year' : year, 'month' : month })
    }

    const ViewHandler = (year, month, day) => {
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
        console.log('before cal : ', monthData)
        return <CalendarGrid monthData={monthData} ViewHandler={ViewHandler} CalHandler={CalHandler} year={date.year} month={date.month}/>
    }
    else{
        return <Main view={view} />
    }

    
}

export default BookCalendar;