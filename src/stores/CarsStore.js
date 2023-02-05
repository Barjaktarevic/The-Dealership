import { action, makeAutoObservable, runInAction } from "mobx";
import { db, collection, getDocs, getDoc, doc, updateDoc } from '../common/firebase/config'
import { sliceArray } from "../common/utils";

const CARS_PER_PAGE = 5

class Cars {
    // Data fetching state
    models = []
    makes = []
    loading = false
    timeout = 2500

    // Updating one car state
    specificModel = null
    editing = false

    // Filtering and sorting state
    filtering = false
    filteredModels = []
    filterCategory = "All"
    selectValue = ""


    // Pagination state
    currentPage = 1
    carsPerPage = CARS_PER_PAGE
    totalPages = 1
    currentCars = []

    constructor() {
        makeAutoObservable(this)
        this.getAllCarsAndManufacturers()
        this.setCurrentCarsAndPages()
    }

    getAllCarsAndManufacturers = async () => {
        this.loading = true
        let dbModels = []
        let dbMakes = []
        const querySnapshot = await getDocs(collection(db, 'vehiclemodel'));

        querySnapshot.forEach(async (doc) => {
            let newModel = { id: doc.id, ...doc.data() };
            if (newModel.makeId) {
                let makeData = await getDoc(newModel.makeId);
                if (makeData.exists()) {
                    newModel.makeId = { makeID: makeData.id, ...makeData.data() }
                    dbModels.push(newModel)
                    let finalMakeData = makeData.data()
                    if (!dbMakes.some(e => e.name === finalMakeData.name)) {
                        dbMakes.push(finalMakeData)
                    }
                }
            }
        })

        runInAction(() => {
            setTimeout(() => {
                this.models = [...dbModels]
                this.makes = [...dbMakes]
                this.loading = false
            }, 1500)
        })
    }

    // gets one individual  model for /models/:id
    getOneCar = (id) => {
        let oneCar = this.models.filter(model => model.id == id)
        this.specificModel = oneCar[0]
    }
    // updates a document in the database
    updateOneCar = (id, newYear) => {
        const docRef = doc(db, 'vehiclemodel', id)
        updateDoc(docRef, { productionStart: parseInt(newYear) })
    }
    // toggles the editing state for a models production start year
    toggleEditing() {
        this.editing = !this.editing
    }

    // loads models for /manufacturers/:make
    filterCarsByManufacturer(manufacturer) {
        this.filteredModels = this.models.filter(model => model.makeId.abbreviation == manufacturer)
    }

    // loads and paginates all models if the user refreshes page on /models
    setCurrentCarsAndPages() {
        this.loading = true
        return new Promise(resolve => {
            setTimeout(action(() => {
                this.currentCars = sliceArray(this.models, this.currentPage, this.carsPerPage)
                this.totalPages = Math.ceil(this.models?.length / this.carsPerPage)
                resolve();
                this.loading = false
                this.timeout = 0
            }), this.timeout)
        })

    }

    setCurrentPage(pageNumber) {
        if (!this.filtering) {
            this.currentPage = pageNumber
            this.currentCars = sliceArray(this.models, this.currentPage, this.carsPerPage)
        } else {
            this.currentPage = pageNumber
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
        }
    }

    setCarsPerPage(number) {
        if (!this.filtering) {
            this.carsPerPage = number
            this.currentPage = 1
            this.currentCars = sliceArray(this.models, this.currentPage, this.carsPerPage)
            this.totalPages = Math.ceil(this.models?.length / this.carsPerPage)
        } else {
            this.carsPerPage = number
            this.currentPage = 1
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
            this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
        }
    }

    filterModelsByManufacturer(param) {
        if (param !== 'All') {
            this.filtering = true
            // this.selectValue = ""
            this.filterCategory = param
            this.filteredModels = this.models.filter(model => model.makeId.abbreviation == param)
            this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
            this.currentPage = 1
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
            if (this.selectValue !== '') {
                this.sortModels(this.selectValue)
            }
        } else {
            this.filtering = false
            // this.selectValue = ""
            this.filterCategory = 'All'
            this.totalPages = Math.ceil(this.models?.length / this.carsPerPage)
            this.currentPage = 1
            this.currentCars = sliceArray(this.models, this.currentPage, this.carsPerPage)
            if (this.selectValue !== '') {
                this.sortModels(this.selectValue)
            }
        }
    }

    sortModels(param) {
        if (!this.filtering && param == "Oldest") {
            this.selectValue = param
            this.filteredModels = this.models.sort((a, b) => a.productionStart - b.productionStart)
            this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
            this.currentPage = 1
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
        } else if (!this.filtering && param == "Newest") {
            this.selectValue = param
            this.filteredModels = this.models.sort((a, b) => b.productionStart - a.productionStart)
            this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
            this.currentPage = 1
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
        } else if (this.filtering && param == "Oldest") {
            this.selectValue = param
            this.filteredModels = this.filteredModels.sort((a, b) => a.productionStart - b.productionStart)
            this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
            this.currentPage = 1
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
        } else if (this.filtering && param == "Newest") {
            this.selectValue = param
            this.filteredModels = this.filteredModels.sort((a, b) => b.productionStart - a.productionStart)
            this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
            this.currentPage = 1
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
        }
    }

}

const CarsStore = new Cars();

export default CarsStore;
