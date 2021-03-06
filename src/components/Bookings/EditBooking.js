import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import '../../static/EditBooking.css';
import Autocomplete from '../AutoComplete';


const EditBooking= ()=>{
    var history= useHistory();
    const {id}= useParams();

    window.addEventListener('keydown',function(e){
        if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
            if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
                e.preventDefault();return false;
            }
        }
    },true);

    const[consultantsArr, setConsultantArr]=useState([]);
    const[Booking, setBooking]= useState({
        name:"",
        consultant:"",
        email:"",
        phone:"",
        website:""
    });

    useEffect(()=>{
        loadConsultants();
    }, []);

    const loadConsultants= async()=>{
        const result =await axios.get("http://localhost:3001/Consultants");
        setConsultantArr(result.data.reverse());
    };

    const {name, consultant, email, phone, website}=Booking;

    const onInputChange=e=>{
        setBooking({...Booking, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        loadUser()
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit=async e=>{
        e.preventDefault();
        await axios.put(`http://localhost:3001/Bookings/${id}`, Booking);
        history.push("/Bookings");
    }
    console.log(Booking);
    const loadUser=async ()=>{
        const result=await axios.get(`http://localhost:3001/Bookings/${id}`);
        setBooking(result.data);
    }
    return(
    <div className="Edit-Booking-container">
    <div className="Edit-booking-card">
        <h2 className="text-center mb-4">Edit Booking</h2>
        <form onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
            Name
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Name"
                    name="name"
                    id="input-name"
                    value={name}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <div className="form-group">
                Consultant
                <Autocomplete
                    AutoPlaceholder="Enter Consultant"
                    defaultValue={consultant}
                    data={consultantsArr}
                    onSelect={consultantSelected => setBooking({...Booking, consultant:consultantSelected.name})}
                />
            </div>

            <div className="form-group">
            Phone Number
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Phone Number"
                    name="phone"
                    id="input-phone-number"
                    value={phone}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <div className="form-group">
            Email Address
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Email Address"
                    name="email"
                    id="input-Email-Address"
                    value={email}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <div className="form-group">
            Website Name
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Website Name"
                    name="website"
                    id="input-website-name"
                    value={website}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <button className="Edit-Booking-Button">Update Changes</button>
        </form>
    </div>
    </div>
    );
};

export default EditBooking;