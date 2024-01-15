export default () => {
    let viewer = document.createElement("script")
    viewer.setAttribute("src", "https://acrobatservices.adobe.com/view-sdk/viewer.js")
    document.head.appendChild(viewer)
};
