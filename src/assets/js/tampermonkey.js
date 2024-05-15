// ==UserScript==
// @name         扇贝单词
// @namespace    http://tampermonkey.net/
// @version      2024-05-13
// @description  try to take over the world!
// @author       You
// @match        https://web.shanbay.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @grant        GM_xmlhttpRequest
// ==/UserScript==


(function () {
    'use strict';

    console.log('Hello, Tampermonkey!');
    document.addEventListener('readystatechange', event => {
        console.log('document.readyState: ', document.readyState)
        main()
    })

    function main() {

        // 处理单词
        function handle_word() {
            // 获取单词
            let word_node = document.querySelector('.index_word__3nhJU')
            let word = word_node?.children[0].innerText
            if (word) {
                // 提示单词提交成功
                console.log('word: ', word)
                // GM_xmlhttpRequest({
                //     method: 'GET',
                //     url: `http://word.stayhungry134.com:8000/word_api/word/?word=${word}`,
                //     onload: function (response) {
                //         console.log('response: ', response)
                //     },
                //     onerror: function (response) {
                //         // 请求失败，处理错误
                //         console.error('Error:', error);
                //     }
                // })
            }
        }


        // 创建一个观察器监听页面加载完毕
        let observer_index = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                // 如果变动类型是子节点变动
                if (mutation.type === 'childList') {
                    // 停止监听页面
                    observer_index.disconnect();

                    // 处理第一个单词
                    handle_word()

                    // 监听单词变化
                    let observer_word = new MutationObserver((mutationsList, observer) => {
                        for (let mutation of mutationsList) {
                            // 如果变动类型是子节点变动
                            if (mutation.type === 'childList') {
                                handle_word()
                            }
                        }
                    })

                    // 配置观察器：指定观察器要观察的节点类型
                    let config = {childList: true};
                    observer_word.observe(document.querySelector('.StudyPage_studyPage__1Ri5C'), config)
                }
            }
        })

        // 配置观察器：指定观察器要观察的节点类型
        let config = {childList: true};

        // 获取单词
        let page_node = document.querySelector('.Layout_main__2_zw8')
        if (!page_node) return
        // 传入目标节点和观察器的配置
        observer_index.observe(page_node, config)
    }
})();