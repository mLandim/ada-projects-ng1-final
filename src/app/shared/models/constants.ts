import { HttpHeaders } from "@angular/common/http";

export const API_URL = 'http://localhost:3000';
export const FRONT_URL = 'http://localhost:4200';
export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'
export const PERFIL_KEY = 'pefil'

export const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': FRONT_URL,
        'Access-Control-Allow-Methods': "PUT, POST, DELETE, GET, OPTIONS",
        'Access-Control-Allow-Headers': "Accept, Authorization, Content-Type",
        'Access-Control-Allow-Credentials': "true"
    })
};