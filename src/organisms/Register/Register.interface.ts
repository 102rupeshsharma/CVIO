export interface IRegisterForm {
    [key: string]: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IRegisterFormErrors {
    [key: string]: boolean;
    username: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}