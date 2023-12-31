import { createSlice } from "@reduxjs/toolkit";
import { Account } from "@/lib/types";

export type Session = {
  session_id: string;
  success: boolean;
  account: Account | null;
  isLogged: boolean;
};

const initialState: Session = {
  success: false,
  session_id: "",
  account: null,
  isLogged: false,
};

const userSession = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setSession: (state: Session, { payload }) => {
      (state.session_id = payload.session_id),
        (state.success = payload.success);
    },

    setAccount: (state: Session, { payload }) => {
      state.account = {
        id: payload.id,
        name: payload.name,
        username: payload.username,
        avatar: payload.avatar,
        iso_3166_1: payload.iso_3166_1,
        iso_639_1: payload.iso_639_1,
      };
      state.isLogged = true;
    },

    logout: (state: Session) => {
      (state.session_id = ""),
        (state.success = false),
        (state.account = null),
        (state.isLogged = false);
    },
  },
});

export const { setSession, logout, setAccount } = userSession.actions;
export default userSession.reducer;
