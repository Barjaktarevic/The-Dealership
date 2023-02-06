import { makeAutoObservable } from "mobx";

class Utils {

    // stores whether the sidebar/edit field is open or closed
    sidebarOpen = false
    editing = false
    // stores items to be set to local storage
    localStorage = []

    constructor() {
        makeAutoObservable(this)
        this.fetchFromLocalStorage()
    }

    fetchFromLocalStorage() {
        const modelsInStorage = localStorage.getItem('favorites')
        if (modelsInStorage) {
            this.localStorage = JSON.parse(modelsInStorage)
        }
    }

    removeFromLocalStorage(id) {
        const newLocalStorage = this.localStorage.filter(model => model.id !== id)
        this.localStorage = newLocalStorage
        localStorage.setItem('favorites', JSON.stringify(this.localStorage))
    }

}

const UtilsStore = new Utils();

export default UtilsStore;
