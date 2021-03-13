import React,{useState} from 'react'
import api from '../../services/api'
import { Button, Container, Form, FormGroup, Input } from 'reactstrap';

export default function Login({history}) {
    const [ email,setEmail ] = useState('')
    const [ password,setPassword ] = useState('')

    const handleSubmit = async evt => {
        evt.preventDefault()
        console.log('Results:',email,password)

        const response = await api.post('/login',{email,password})
        const userId = response.data._id || false

        if(userId){
            localStorage.setItem('user',userId)
            history.push('/dashboard')
        }else{
            const { message } = response.data
            console.log(message)
        }
    }

    return (
        <Container>
            <h2>Login</h2>
            <p>Please <strong>Login</strong> to access your account</p>
            <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
            <Input type="email" name="email" id="exampleEmail" placeholder="Your email" onChange={ evt => setEmail(evt.target.value)} />
            </FormGroup>

            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
            <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={ evt => setPassword(evt.target.value)} />
            </FormGroup>

            <Button>Submit</Button>
        </Form>
      </Container>
    )
}





