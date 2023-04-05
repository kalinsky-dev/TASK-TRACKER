import * as request from "./requester";

const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3030'
  : 'http://localhost:3030'; // TODO: Add server url when deployed

const url = `${baseUrl}/data/tasks`;

export const getAll = () => request.get(url);

export const getOne = (taskId) => request.get(`${url}/${taskId}`)

export const create = (taskData) => request.post(url, taskData);

export const edit = (taskId, taskData) => request.put(`${url}/${taskId}`, taskData);

export const remove = (taskId) => request.del(`${url}/${taskId}`);