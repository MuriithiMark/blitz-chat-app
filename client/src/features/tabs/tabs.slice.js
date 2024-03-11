import { createSlice } from "@reduxjs/toolkit";

/**
 * @type {{name: string, isActive: boolean}[]}
 */
const initialTabsState = [];

// TODO idea to use tab groups instead of direct [] e.g {{home: tabs[], about: tabs[]}}

const tabsSlice = createSlice({
    name: "tabs",
    initialState: initialTabsState,
    reducers: {
        createTab: (state, action) => {
            if(state.find(tab => tab.name === action.payload.name)) {
                return state
            }
            return [
                ...state,
                action.payload
            ]
        },
        switchToTab: (state, action) => {
            const updatedTabs = state.map((tab) => {
                if (tab.name === action.payload) {
                    tab.isActive = true
                }
                else {
                    tab.isActive = false;
                }
                return tab;
            })

            return updatedTabs;
        },
    }
})

export const {createTab, switchToTab } = tabsSlice.actions
export default tabsSlice.reducer