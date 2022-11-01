import React, {useReducer} from 'react'
import { BiBrush } from 'react-icons/bi'
import Success  from './success';
import Bug from './bug'
import { getUser, getUsers, updateUser } from './lib/helper';
import { useMutation, useQuery, useQueryClient } from 'react-query';



const UpdateUserForm = ({ formId, formData, setFormData }) => {
    
    const queryClient = useQueryClient()

    const {isLoading, isError, data, error} = useQuery(['user',formId], () => getUser(formId))
    const UpdateMutation = useMutation(newData => updateUser(formId, newData), {
        onSuccess: async (data) => {
            //queryClient.setQueryData('users',(old)=>[data])
            queryClient.prefetchQuery('users', getUsers)
        }})
    
    if(isLoading) return <div>Loading!</div>
    if(isError) return <Bug message = {error.message} />


    const { name ,avatar, email, salary, date, status } = data
    const [ firstname, lastname ] = name ? name.split(' '): formData

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        let userName = `${formData.firstName ?? firstname } ${formData.lastName ?? lastname}`
        let updated = Object.assign({}, data, formData, {name: userName})
        await UpdateMutation.mutate(updated)
    }
    

    

  return (
    <form className='grid lg:grid-cols-2 w-4/6 gap-4' onSubmit={handleSubmit}>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline' onChange={setFormData} defaultValue={firstname} type='text' name = 'firstname' placeholder='Full Name' />

        </div>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline' onChange={setFormData} defaultValue={lastname} type='text' name = 'lastname' placeholder='Last Name' />
        </div>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline' onChange={setFormData} defaultValue={email} type='email' name = 'email' placeholder='Email' />
        </div>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline' onChange={setFormData} defaultValue={salary} type='number' name = 'salary' placeholder='Salary' />
        </div>
        <div className='input-type'>
            <input className='border w-full px-5 py-3 focus:outline rounded-md' onChange={setFormData} defaultValue ={date} type='date' name = 'date' placeholder='Date' />
        </div>


        <div className='flex gap-10 items-center'>
            <div className='form-check'>
                <input className ='form-check-input apperance-none rounded-full h-4 w-4 border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left-mr-2 cursor-pointer'
                defaultChecked={status === 'Active'}
                type = 'radio'
                id ='radioDefault1' 
                value= 'Active'
                name='status' />
                <label className ='inline-block tet-gray-800'htmlFor ='radioDefault1'>Active</label>
            </div>
            <div className='form-check'>
                <input className ='form-check-input apperance-none rounded-full h-4 w-4 border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left-mr-2 cursor-pointer'
                defaultChecked={status !== 'Active'}
                type = 'radio'
                id ='radioDefault1' 
                value= 'Inactive'
                name='status' />
                <label className ='inline-block tet-gray-800'htmlFor ='radioDefault1'>Inactive</label>
            </div>
        </div>
        <button className='flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500'>
        Update <span className='px-1'><BiBrush size={24} /> </span>
        </button>
    </form> 
  )
}



export default UpdateUserForm