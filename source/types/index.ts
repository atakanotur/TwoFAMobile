export interface User {
  _id: String;
  email: String;
  is_active: Boolean;
  first_name: String;
  last_name: String;
  phone_number: String;
  otp_enabled: Boolean;
  otp_verified: Boolean;
  otp_base32: String;
  otp_auth_url: String;
}

export interface UserForLogin {
  email: String;
  password: String;
}

export interface LoginWithTwoFA {
  user_id: String;
  code: String;
}

export interface VerifyUser {
  user_id: String;
  token: String;
}

export interface ValidateUser {
  user_id: String;
  token: String;
}

export interface UserForRegister {
  email: String;
  password: String;
  first_name: String;
  last_name: String;
  phone_number: String;
  roles: String[];
}

export interface Role {
  id: String;
  role_name: String;
  is_active: Boolean;
  created_by: String;
  created_at: Date;
  updated_at: Date;
}

export interface InitialStateBase {
  isLoading: Boolean;
  error: any;
}

export interface Secret {
  ascii: String;
  hex: String;
  base32: String;
  otpauth_url: String;
}
