import Axios, {AxiosResponse} from 'axios'

export type User = {
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

export type WithDataState<T> = 
    | {
        type: "loading"
    }
    | {
        type: "loaded"
        data: AxiosResponse<T>
    }
    | {
        type: "error"
    }