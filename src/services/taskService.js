import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/tasks';

export const getAll = () => request.get(baseUrl);

export const create = (gameData) => request.post(baseUrl, gameData);

