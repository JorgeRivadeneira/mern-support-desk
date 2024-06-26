import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/User.ts";
import authService from "./authService.ts";

//Get user from localstorage
const user = JSON.parse(localStorage.getItem('user')!);

const initialState = {
    user: user ? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register',
    async (user: User, thunkAPI) => {        
      try {
        return await authService.register(user)
      } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) ||
            error.message || error.toString();        
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const login = createAsyncThunk(
    'auth/login',
    async (user: User, thunkAPI) => {
        try {
            return await authService.login(user)
          } catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();        
            return thunkAPI.rejectWithValue(message)
          }        
    }
  );
  
  //logout user
  export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
  });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state: any) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(register.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload
            })

            .addCase(login.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(login.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload
            })            
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });         
    }
});


export const {reset} = authSlice.actions;
export default authSlice.reducer;