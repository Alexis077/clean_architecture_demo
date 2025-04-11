export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserRegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserWithToken extends UserDto {
  token: string;
}
