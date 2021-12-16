import React, { useState, useEffect } from 'react';
import CalendarGrid from "./formCal";
import moment from 'moment'

function BookCalendar() {
    // const today = new Date()
    // useEffect =>
    // axios =>
    // req = today.year, today.month
    // res = imageList

    return(
        <div>
            {/* imageList 밑에 다 넣는다. */}
            <CalendarGrid />
        </div>
    )
}

export default BookCalendar;