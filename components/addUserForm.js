import React, {useReducer} from 'react'
import { BiPlus } from 'react-icons/bi'
import Success  from './success';
import Bug from './bug'
import { useQueryClient, useMutation } from 'react-query';
import { addUser, getUsers } from './lib/helper';



const AddUserForm = ({ formData, setFormData }) => {
    
    const queryClient = useQueryClient()
    const addMutation = useMutation(addUser, {
        onSuccess: () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        if(Object.keys(formData).length === 0){
            return console.log("No Form Data")
        }
        let { firstname, lastname, email, salary, date, status } = formData

        const model = {
            name : `${firstname} ${lastname}`,
            avatar : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
            email,salary,date,status : status ?? 'Active'
        }

        addMutation.mutate(model)
    }
    
    if(addMutation.isLoading){
        return <div>Loading!</div>
    }
    if(addMutation.isError){
        return <Bug message = {addMutation.error.message} />
    }
    if(addMutation.isSuccess){
        return <Success message = {"success"} />
    }
    

  return (
    <form className='grid lg:grid-cols-2 w-4/6 gap-4' onSubmit={handleSubmit}>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline' onChange={setFormData} type='text' name = 'firstname' placeholder='Full Name' />

        </div>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline' onChange={setFormData} type='text' name = 'lastname' placeholder='Last Name' />
        </div>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline' onChange={setFormData} type='email' name = 'email' placeholder='Email' />
        </div>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline' onChange={setFormData} type='number' name = 'salary' placeholder='Salary' />
        </div>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline rounded-md' onChange={setFormData}type='date' name = 'date' placeholder='Date' />
        </div>


        <div className='flex gap-10 items-center'>
            <div className='form-check'>
                <input className ='form-check-input apperance-none rounded-full h-4 w-4 border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left-mr-2 cursor-pointer'
                type = 'radio'
                id ='radioDefault1' 
                value= 'Active'
                name='status' />
                <label className ='inline-block tet-gray-800'htmlFor ='radioDefault1'>Active</label>
            </div>
            <div className='form-check'>
                <input className ='form-check-input apperance-none rounded-full h-4 w-4 border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left-mr-2 cursor-pointer'
                type = 'radio'
                id ='radioDefault1' 
                value= 'Inactive'
                name='status' />
                <label className ='inline-block tet-gray-800'htmlFor ='radioDefault1'>Inactive</label>
            </div>
        </div>
        <button className='flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500'>
        Add <span className='px-1'><BiPlus size={24} /> </span>
        </button>
    </form> 
  )
}





export default AddUserForm