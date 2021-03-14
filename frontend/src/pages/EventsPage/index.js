import React,{useState,useMemo} from 'react'
import api from '../../services/api'
import { Alert, Button, Container, Form, FormGroup, Input,Label } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import './events.css'

export default function EventsPage() {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [sport,setSport] = useState('')
    const [thumbnail,setThumbnail] = useState(null)
    const [date,setDate] = useState('')
    const [errorMessage,setErrorMessage] = useState(false)

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail): null
    },[thumbnail])

    console.log(title,description,price,sport)

    const submitHandler = async (evt) => {
        const user_id = localStorage.getItem('user')

        const eventData = new FormData()

        eventData.append("thumbnail",thumbnail)
        eventData.append("sport",sport)
        eventData.append("title",title)
        eventData.append("price",price)
        eventData.append("description",description)
        eventData.append("date",date)

        try {
            if(title !== "" && 
                description !== "" && 
                sport !== "" && 
                date !== "" && 
                price !== "" && 
                thumbnail !== null 
            ){
                console.log("Event has been sent")
                await api.post("/event",eventData,{headers:{user_id}})
                console.log("eventData")
                console.log("Event has been saved")
            }else{
                setErrorMessage(true)
                setTimeout(()=>  {
                    setErrorMessage(false)
                },2000)
                console.log('Missing required data')
            }
        } catch (error) {
            Promise.reject(error)
            console.log(error.message)
        }
        evt.preventDefault()
        return ""
    }
    return (
        <Container>
           <h1>Create your Event</h1>
           <Form onSubmit={submitHandler}>
            <FormGroup>
                <Label>Upload Image: </Label>
                <Label id='thumbnail' style={{backgroundImage : `url(${preview})`}} className={thumbnail ? 'has-thumbnail': null}>
                <Input type="file" onChange={evt => setThumbnail(evt.target.files[0])} />
                <img src={cameraIcon} style={{maxWidth:"50px"}} alt="upload icon image" />
                </Label>
            </FormGroup>    
            <FormGroup>
                <Label>Sport: </Label>
                <Input type="text" id="sport" value={sport} placeholder={"Sport name"} onChange={evt => setSport(evt.target.value)} />
            </FormGroup>   
            <FormGroup>
                <Label>Title: </Label>
                <Input type="text" id="title" value={title} placeholder={"Event title"} onChange={evt => setTitle(evt.target.value)} />
            </FormGroup>   
            <FormGroup>
                <Label>Event Description: </Label>
                <Input type="text" id="description" value={description} placeholder={"Event Description"} onChange={evt => setDescription(evt.target.value)} />
            </FormGroup>   
            <FormGroup>
                <Label>Event Price: </Label>
                <Input type="text" id="price" value={price} placeholder={"Price #0.00"} onChange={evt => setPrice(evt.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Event Date: </Label>
                <Input type="date" id="date" value={date} placeholder={"Event date"} onChange={evt => setDate(evt.target.value)} />
            </FormGroup>
            <Button type="submit">
                Submit
            </Button>
           </Form>
           { errorMessage ? (
               <Alert className="event-validation" color="danger">Missing required information</Alert>
           ):""}
        </Container>
    )
}