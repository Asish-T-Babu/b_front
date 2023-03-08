import React,{useState,useContext} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PostContext } from '../../context';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AdvisorUpdateModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name,setName]=useState('')
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const {advisorDeleteModalBoolean,setAdvisorDeleteModalBoolean} = useContext(PostContext)
  const {reviewerDeleteModalBoolean,setReviewerDeleteModalBoolean} = useContext(PostContext)
  const { register, handleSubmit, formState: { errors } }=useForm()

  const handleSubmits=(e)=>{
    e.preventDefault()
    axios.put(`https://brosapp.xyz/update_advisor/${props.data.id}`,{
    first_name:name,
    username:username,
    email:email,
    phone:phone
    }).then((response)=>{
        console.log(response.data)
        setName('')
        setUsername('')
        setEmail('')
        handleClose()
        setAdvisorDeleteModalBoolean(!(advisorDeleteModalBoolean))
        setReviewerDeleteModalBoolean(!(reviewerDeleteModalBoolean))
      }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update User
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="given-name"
                name="name" 
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register('name',{ required:true})}
                defaultValue={props.data.first_name} onChange={(e)=>setName(e.target.value)}
              />
               {errors.name && <span>This field is required</span>}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                {...register('username',{ required:true })}
                defaultValue={props.data.username} onChange={(e)=>setUsername(e.target.value)}
                
              />
            {errors.username && <span>This field is required</span>}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register('email',{ required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                defaultValue={props.data.email} onChange={(e)=>setEmail(e.target.value)}
              />
               {errors.email && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                {...register('phone',{ required:true })}
                defaultValue={props.data.phone} onChange={(e)=>setPhone(e.target.value)}
                
              />
            {errors.phone && <span>This field is required</span>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e)=>{handleSubmits(e);handleClose()}}
          >
            Update
          </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}