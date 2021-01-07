import axios from 'axios';
import React from 'react';
import team from '../team.png';

class Inputstudent extends React.Component {
    state = {
        firstname: '',
        lastname: '',
        place: '',
    }
    handleChange = (e) => {
        console.log('e.target.name>>>', e.target.name);
        console.log('e.target.value>>>', e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        //e.preventDefault(); 
        if (this.state.firstname !== '' && this.state.lastname !== '' && this.state.place !== '') {
            axios.post('http://localhost:5000/students', this.state)
                .then((data) => {
                    console.log('Successfully Posted');
                    this.setState({ firstname: '', lastname: '', place: '' })
                });
            window.location = '/';//Referesing the page
        }
    }
    render() {
        return (
            <div className='row text-center'>
                <div className='col-md-4'>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input onChange={(e) => this.handleChange(e)} name='firstname' values={this.state.firstname} style={{ marginLeft: '50px', marginTop: '20px', fontFamily: 'Cursive,sans-serif,Gugi', borderRadius: '10px' }} placeholder='First Name' className='form-control' ></input>
                        <input onChange={(e) => this.handleChange(e)} name='lastname' values={this.state.lastname} style={{ marginLeft: '50px', marginTop: '20px', fontFamily: 'Cursive,sans-serif,Gugi', borderRadius: '10px' }} placeholder='Last Name' className='form-control'></input>
                        <input onChange={(e) => this.handleChange(e)} name='place' values={this.state.place} style={{ marginLeft: '50px', marginTop: '20px', fontFamily: 'Cursive,sans-serif,Gugi', borderRadius: '10px' }} placeholder='Place' className='form-control'></input>
                        <button style={{ marginLeft: '50px', marginTop: '20px', width: '435px', backgroundColor: '#000066', color: 'white', fontFamily: 'Cursive,sans-serif,Gugi', borderRadius: '10px' }} className='btn'>CREATE</button>
                    </form>
                </div>
                <div>
                    <img src={team} />
                </div>
            </div>
        )
    }
}
export default Inputstudent;