export function addSeconds(seconds) {
    if (+seconds) {
        let now = new Date();

        return new Date(now.setSeconds(now.getSeconds() + (+seconds)))
    }

    return new Date();
}