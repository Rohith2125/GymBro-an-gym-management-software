import {useState} from 'react'

function Login(){

    const [name, setName]= useState('')
    const [password, setPassword]= useState('')

const handleSubmit= (e)=>{
    e.preventDefault()


}

    return(<>

    <form onSubmit={handleSubmit}>
    
    <input type="text" placeholder="enter the email" onChange={(e)=>{setName(e.target.value)}} />
    <input type="password" placeholder="enter the password" onChange={(e)=>{setPassword(e.target.value)}} />
    <button type="submit">Submit</button>
    
    </form>
    
    
    </>)
}

export default Login;