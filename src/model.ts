import {AxiosResponse} from 'axios'

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

export type Option<T> = 
    | {
        kind: "none"
    }
    | {
        kind: "some"
        value: T
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