import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] =useState([])
    const [isLoggedIn , setIsLoggedIn] = useContext(UserContext)
    

    useEffect(()=>{
        fetch(`http://localhost:4000/bookings?email=${isLoggedIn.email}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data =>setBookings(data))
    },[])
    return (
        <div>
            <h3>Total Bookings : {bookings.length} Room</h3>
            {
                bookings.map(booking =><li key={booking._id}>{booking.name} , {booking.email} From: {(new Date(booking.checkIn).toDateString('dd/MM/yyyy'))} - To: {(new Date(booking.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;