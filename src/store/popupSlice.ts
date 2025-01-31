import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { CookieType } from './cookiesSlice'
import type { RootState } from '.'

export enum PopupType {
  COOKIES = 'cookies',
  CELO_DISCLAIMER = 'celo_disclaimer',
}

type PopupState = {
  [PopupType.COOKIES]: {
    open: boolean
    warningKey?: CookieType
  }
  [PopupType.CELO_DISCLAIMER]: {
    open: boolean
  }
}

const initialState: PopupState = {
  [PopupType.COOKIES]: {
    open: false,
  },
  [PopupType.CELO_DISCLAIMER]: {
    open: false,
  },
}

export const popupSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    openCookieBanner: (state, { payload }: PayloadAction<{ warningKey?: CookieType }>) => {
      state[PopupType.COOKIES] = {
        ...payload,
        open: true,
      }
    },
    closeCookieBanner: (state) => {
      state[PopupType.COOKIES] = { open: false }
    },
    openCeloDisclaimer: (state) => {
      state[PopupType.CELO_DISCLAIMER] = { open: true }
    },
    closeCeloDisclaimer: (state) => {
      state[PopupType.CELO_DISCLAIMER] = { open: false }
    },
  },
})

export const { openCookieBanner, closeCookieBanner, openCeloDisclaimer, closeCeloDisclaimer } = popupSlice.actions

export const selectCookieBanner = (state: RootState) => state[popupSlice.name][PopupType.COOKIES]
export const selectCeloDisclaimer = (state: RootState) => state[popupSlice.name][PopupType.CELO_DISCLAIMER]
