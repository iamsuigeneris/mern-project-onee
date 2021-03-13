import React,{useState} from 'react'
import api from '../../services/api'
import { Button, Container, Form, FormGroup, Input } from 'reactstrap';

export default function Register({history}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = async evt => {
        evt.preventDefault()
        console.log('Results:',email,password, firstName,lastName)

        const response = await api.post('/user/register',{email,password,firstName,lastName})
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
        <h2>Register</h2>
        <p>Please <strong>Register</strong> for new account</p>
        <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Input type="text" name="firstName" id="firstName" placeholder="First name" onChange={ evt => setFirstName(evt.target.value)} />
        </FormGroup>

        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Input type="text" name="lastName" id="lastName" placeholder="Last name" onChange={ evt => setLastName(evt.target.value)} />
        </FormGroup>

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





