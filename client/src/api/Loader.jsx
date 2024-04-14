import { baseApi } from "./base"

export function getPosts(options) {
    return baseApi.get("posts", options).then(res => res.data)
  }
  
export function getPost(postId, options) {
    return baseApi.get(`posts/${postId}`, options).then(res => res.data)
  }

export function getTodos(options) {
    return baseApi.get("todos", options).then(res => res.data)
}

export function getUsers(options) {
    return baseApi.get("users", options).then(res => res.data)
}
  
export function getUser(userId, options) {
    return baseApi.get(`users/${userId}`, options).then(res => res.data)
}

export function getComments(postId, options) {
    return baseApi.get(`posts/${postId}/comments`, options).then(res => res.data)
}

export function createPost(data, options) {
    return baseApi.post("posts", data, options).then(res => res.data)
  }