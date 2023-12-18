import { defineStore } from 'pinia'

export const useColorStore = defineStore('counter', {
    state: () => {
        return {
            // 用于存储主题颜色
            theme_option: [
                {
                    'name': '翡翠绿',
                    'theme_color': '#209e85',
                    'tab_color': '#e84c3d'
                },
                {
                    'name': '珊瑚橙',
                    'theme_color': '#f66b60',
                    'tab_color': '#5d9cec'
                },
                {
                    'name': '橘子黄',
                    'theme_color': '#e39a64',
                    'tab_color': '#34495e'
                },
                {
                    'name': '天空蓝',
                    'theme_color': '#5d9cec',
                    'tab_color': '#209e85'
                },
                {
                    'name': '姹紫嫣红',
                    'theme_color': '#9b59b6',
                    'tab_color': '#1cbbb4'
                },
                {
                    'name': '樱桃粉',
                    'theme_color': '#f66b60',
                    'tab_color': '#34495e'
                },
                {
                    'name': '酷炫黑',
                    'theme_color': '#34495e',
                    'tab_color': '#999999'
                },
                {
                    'name': '清新蓝',
                    'theme_color': '#1cbbb4',
                    'tab_color': '#e84c3d'
                },
                {
                    'name': '活力橙',
                    'theme_color': '#f39c12',
                    'tab_color': '#1cbbb4'
                },
                {
                    'name': '原谅绿',
                    'theme_color': '#2ecc71',
                    'tab_color': '#e39a64'
                },
                {
                    'name': '青草绿',
                    'theme_color': '#27ae60',
                    'tab_color': '#e84c3d'
                },
                {
                    'name': '天空蓝',
                    'theme_color': '#3498db',
                    'tab_color': '#e39a64'
                },
            ],
            theme_color: '#209e85',
            tab_color: '#e84c3d',
        }
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        update_theme_color(color: string) {
            this.theme_color = color
        },
        update_tab_color(color: string) {
            this.tab_color = color
        }
    },
})