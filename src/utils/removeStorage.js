export const removeStorage = () => {
    localStorage.removeItem("create_id");
    localStorage.removeItem("action");
    localStorage.removeItem("doneStep1");
    localStorage.removeItem("doneStep2");
}