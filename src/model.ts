import {AxiosResponse} from 'axios'

// const https = require('https');

export class User {
    Id?: number
    Email: string
    Password: string
    FirstName: string
    LastName: string
    Street?: string
    BuildingNumber?: string
    PostalCode?: string
    Area?: string
    Admin: boolean
}

export type Option<T> = 
    | {
        kind: "none"
    }
    | {
        kind: "some"
        value: AxiosResponse<T>
    }

export type WithDataState<T> = 
    | {
        type: "loading"
    }
    | {
        type: "loaded"
        data: Option<T>
    }
    | {
        type: "error"
        error: string
    }

// export const client = Axios.create({
//     httpsAgent: new https.Agent({  
//         rejectUnauthorized: false
//       })
// })