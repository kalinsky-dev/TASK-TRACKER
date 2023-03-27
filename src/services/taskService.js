import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/tasks';

export const getAll = () => request.get(baseUrl);

export const getOne = (taskId) => request.get(`${baseUrl}/${taskId}`)

export const create = (taskData) => request.post(baseUrl, taskData);

export const edit = (taskId, taskData) => request.put(`${baseUrl}/${taskId}`, taskData);

export const remove = (taskId) => request.del(`${baseUrl}/${taskId}`);