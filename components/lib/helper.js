const BASE_URL = "https://employee-management-blush-xi.vercel.app"

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/api/users/`)
    const data = await response.json()
    return data
}

export const getUser = async (id) => {
    const response = await fetch(`${BASE_URL}/api/users/${id}`)
    const data = await response.json()
    return data
}

export const addUser = async (formData) => {
    try {
        const Options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)

        }

        const response = await fetch(`${BASE_URL}/api/users/`, Options)
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
    
}

export const updateUser = async (id, formData) => {
    try {
        const Options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)

        }

        const response = await fetch(`${BASE_URL}/api/users/${id}`, Options)
        const data = await response.json()
        return data
        
    } catch (error) {
        return error
    }
}


export const deleteUser = async (id) => {
    try {
        const Options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }

        const response = await fetch(`${BASE_URL}/api/users/${id}`, Options)
        const data = await response.json()
        return data
        
    } catch (error) {
        return error
    }
}