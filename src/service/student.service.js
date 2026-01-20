import apiClient from "../lib/api.js";

export const testEndpoint = ()=>{
    return apiClient.get("/hello");
}


export const getStudents = ()=>{
    return apiClient.get("/students")

}

export const getStudent = (id)=>{
    return apiClient.get(`/students/${id}`)

}


export const postStudent = (data)=>{
    return apiClient.post("/students",data)

}

export const updateStudent = (id,data)=>{
    return apiClient.put(`/students/${id}`,data)

}

export const deleteStudent= (id)=>{
    return apiClient.delete(`/students/${id}`);

}