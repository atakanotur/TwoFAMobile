import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  login,
  register,
  validate,
  verify,
  generateOTP,
  disableOTP,
} from '../../services';
import {
  InitialStateBase,
  UserForLogin,
  UserForRegister,
  User,
  VerifyUser,
  ValidateUser,
} from '../../types';

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (userForLogin: UserForLogin) => {
    const result = await login(userForLogin);
    return result;
  },
);

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (userForRegister: UserForRegister) => {
    const result = await register(userForRegister);
    return result;
  },
);

export const generateOTPAsync = createAsyncThunk(
  'auth/generateOTPAsync',
  async ({userId, token}: {userId: String; token: String}) => {
    const result = await generateOTP(userId, token);
    return result;
  },
);

export const verifyAsync = createAsyncThunk(
  'auth/verifyAsync',
  async (verifyUser: VerifyUser) => {
    const result = await verify(verifyUser);
    return result;
  },
);

export const validateAsync = createAsyncThunk(
  'auth/validateAsync',
  async ({
    validateUser,
    token,
  }: {
    validateUser: ValidateUser;
    token: String;
  }) => {
    const result = await validate(validateUser, token);
    return result;
  },
);

export const disableOTPAsync = createAsyncThunk(
  'auth/disableOTPAsync',
  async ({userId, token}: {userId: String; token: String}) => {
    const result = await disableOTP(userId, token);
    return result;
  },
);

interface InitialState extends InitialStateBase {
  token: String;
  user: User;
  userId: String;
}

const initialState: InitialState = {
  user: {
    _id: '',
    email: '',
    is_active: false,
    first_name: '',
    last_name: '',
    phone_number: '',
    otp_enabled: false,
    otp_verified: false,
    otp_base32: '',
    otp_auth_url: '',
  },
  userId: '',
  token: '',
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = {
        _id: '',
        email: '',
        is_active: false,
        first_name: '',
        last_name: '',
        phone_number: '',
        otp_enabled: false,
        otp_verified: false,
        otp_base32: '',
        otp_auth_url: '',
      };
      state.token = '';
      state.userId = '';
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    //login
    builder.addCase(loginAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      const {user, token} = action.payload?.data;
      state.user = {...user};
      state.token = token;
      state.userId = user._id;
      state.isLoading = false;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    //register
    builder.addCase(registerAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      const {user, token} = action.payload?.data;
      state.user = {...user};
      state.token = token;
      state.isLoading = false;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    //generateOTP
    builder.addCase(generateOTPAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(generateOTPAsync.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(generateOTPAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    //verify
    builder.addCase(verifyAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(verifyAsync.fulfilled, (state, action) => {
      const {user, token} = action.payload?.data;
      state.user = {...user};
      state.token = token;
      state.isLoading = false;
    });
    builder.addCase(verifyAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //validate
    builder.addCase(validateAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(validateAsync.fulfilled, (state, action) => {
      const {user, token} = action.payload?.data;
      state.user = {...user};
      state.token = token;
      state.isLoading = false;
    });
    builder.addCase(validateAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export const {logout, updateUser} = authSlice.actions;

export default authSlice.reducer;
