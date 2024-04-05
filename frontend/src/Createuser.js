import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Createuser(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dob,setdob] = useState('')
    const [errors,seterrors] = useState('')
    const navigate  = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        if (name.length === 0 || email.length ===0 || dob.length === 0){
            seterrors("All Fields are Mandatory")
        }else{
            seterrors('')
            axios.post('http://localhost:8081/create',{name,email,dob})
            .then(res =>{
                if (res.data === "Email Already Exist"){
                    seterrors(res.data)
                }else{
                    navigate('/');
                }
                
            }).catch(err =>{
                seterrors(err)
                //console.log(err);
            })
        }
        
    }

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter your Name" className="form-control" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Enter your Email" className="form-control" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Date of Birth</label>
                        <input type="date" placeholder="Enter Date of Birth" className="form-control" onChange={e => setdob(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                    <button className="btn btn-warning m-3" onClick={()=>navigate('/')}>Back to Home</button>
                </form>
                <p className='text-danger m-3'>{errors}</p>

            </div>
        </div>
    )
}
export default Createuser