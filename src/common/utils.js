export function sliceArray(arr, arg1, arg2) {
    return arr.slice((arg1 * arg2) - arg2, arg1 * arg2)
}