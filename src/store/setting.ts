import { defineStore } from "pinia";
import { merge } from "lodash";

export interface SettingState {
    keyboardSound: boolean,
    keyboardSoundFile: String,
    keyboardSoundVolume: number,
}

export const DefaultSettingState = (): SettingState => ({
    keyboardSound: true,
    keyboardSoundFile: '机械键盘2',
    keyboardSoundVolume: 100,

})

export const useSettingStore = defineStore('setting', {
    state: () => {
        return DefaultSettingState()
    },
    getters: {

    },
    actions: {

    }
})