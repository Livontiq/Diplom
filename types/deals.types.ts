export interface IBaseField {
    $createdAt?: string
    $id: string
}

// для редактирования профиля юзеров
export interface IUser extends IBaseField {
    name: string
    email: string
    avatar_url?: string
}

export interface ICustomer extends IBaseField {
    name: string
    email: string
    avatar_url?: string
}

export interface IComment extends IBaseField {
    text: string
}

export enum EnumStatus {
    'to-be-agreed' = 'to-be-agreed',
    'in-progress' = 'in-progress',
    'done' = 'done',
}

export interface IType extends IBaseField {
    name: string
}

export interface IAuthor extends IBaseField {
    name: string
}

export interface IDeal extends IBaseField {
    name: string
    types: IType
    authors: IAuthor
    price: number
    quantity: number
    status?: EnumStatus
    customers: ICustomer
    comments: IComment[]
    // возможно date не стринг
    date: string
}