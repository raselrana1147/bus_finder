/**
 * Created by aminur on 4/1/21.
 */
function getTitle (vm) {
    const { title } = vm.$options;
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

export default {
    created () {
        const title = getTitle(this);
        if (title) {
            document.title = title
        }
    }
}
