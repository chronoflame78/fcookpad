export const removeStorage = () => {
    localStorage.removeItem("action");
    localStorage.removeItem("doneStep2");
    localStorage.removeItem("returnURL");
}