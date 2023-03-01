import { makeAutoObservable } from "mobx";
import CarsStore from "./CarsStore";

class Utils {
    sidebarOpen = false
    localStorage = []
    flashMessage = ""

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
        const newLocalStorage = this.localStorage.filter(model => model._id !== id)
        this.localStorage = newLocalStorage
        localStorage.setItem('favorites', JSON.stringify(this.localStorage))
    }

    addToLocalStorage() {
        if (this.localStorage.some(e => e.name === CarsStore.specificModel.name)) {
            return
        } else {
            this.localStorage.push(CarsStore.specificModel)
            localStorage.setItem('favorites', JSON.stringify(this.localStorage))
        }
    }
}

const UtilsStore = new Utils();

export default UtilsStore;
