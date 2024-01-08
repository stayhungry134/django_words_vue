import {defineAsyncComponent, onMounted, Ref, ref, watchEffect} from "vue";
import {useSettingStore} from "@/store/setting";

// 播放音频
export function useSound(audioSrcList?: string[], audioFileLength?: number) {
    let audioList: Ref<HTMLAudioElement[]> = ref([])
    let audioLength = ref(1)
    let index = ref(0)

    onMounted(() => {
        if (audioSrcList) setAudio(audioSrcList, audioFileLength)
    })

    function setAudio(audioSrcList2: string[], audioFileLength2?: number) {
        if (audioFileLength2) audioLength.value = audioFileLength2
        audioList.value = []
        // TODO 这里有问题，audio只能动态引用，不能直接引用
        for (let i = 0; i < audioLength.value; i++) {
            audioSrcList2.map(src => audioList.value.push(new Audio(src)))
        }
        console.log(audioList.value[0])
        index.value= 0
    }

    function play(volume: number = 100) {
        index.value++
        if (audioList.value.length > 1 && audioList.value.length !== audioLength.value) {
            audioList.value[index.value % audioList.value.length].volume = volume / 100
            audioList.value[index.value % audioList.value.length].play()
        } else {
            audioList.value[index.value % audioLength.value].volume = volume / 100
            audioList.value[index.value % audioLength.value].play()
        }
    }

    return {play, setAudio}
}


// 音频文件选项
export const SoundFileOptions = [
    {value: '机械键盘', label: '机械键盘'},
    {value: '机械键盘1', label: '机械键盘1'},
    {value: '机械键盘2', label: '机械键盘2'},
    {value: '老式机械键盘', label: '老式机械键盘'},
    {value: '笔记本键盘', label: '笔记本键盘'},
]


export function usePlayKeyboardAudio() {
    // 创建或获取名为 'setting' 的状态管理 store
    const settingStore = useSettingStore();

    // 使用 'useSound' hook 获取音频播放的相关函数和状态
    const { play, setAudio } = useSound();

    watchEffect(() => {
        // 检查当前设置的键盘声音文件是否在 SoundFileOptions 中存在
        if (!SoundFileOptions.find(v => v.label === settingStore.keyboardSoundFile)) {
            // 如果不存在，将其设置为默认值 '机械2'
            settingStore.keyboardSoundFile = '机械2';
        }

        // 获取键盘声音文件对应的 URL 列表
        let urlList = getAudioFileUrl(settingStore.keyboardSoundFile as string);

        // 根据 URL 列表长度设置音频播放次数
        setAudio(urlList, urlList.length === 1 ? 3 : 1);
    });

    // 定义播放音频的函数
    function playAudio() {
        // 如果键盘声音开启，调用 'play' 函数播放音频，并传入音量参数
        if (settingStore.keyboardSound) {
            play(settingStore.keyboardSoundVolume);
        }
    }

    // 返回播放音频的函数
    return playAudio;
}


// 获取音频文件路径
export function getAudioFileUrl(name: string) {
    if (name === '机械键盘') {
        return [
            `@/assets/video/keyboard/machine/机械0.mp3`,
            `@/assets/video/keyboard/machine/机械1.mp3`,
            `@/assets/video/keyboard/machine/机械2.mp3`,
            `@/assets/video/keyboard/machine/机械3.mp3`,
        ]
    } else {
        return [`@/assets/video/keyboard/${name}.mp3`]
    }
}