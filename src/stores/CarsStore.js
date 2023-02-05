import { action, makeAutoObservable } from "mobx";
import { db, collection, getDocs, getDoc, doc, updateDoc } from '../common/firebase/config'
import { sliceArray } from "../common/utils";

const CARS_PER_PAGE = 5

class Cars {
    // Data fetching state
    models = []
    makes = []
    loading = false
    timeout = 2500
    error = null

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

    // fetches all models and populates their manufacturers from the database
    getAllCarsAndManufacturers = async () => {
        try {
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

            setTimeout(action(() => {
                this.models = [...dbModels]
                this.makes = [...dbMakes]
                this.loading = false
            }), 1500)
        } catch (err) {
            console.log(err)
            this.error = err.message
        }
    }

    // fetches one car from the database and populates its manufacturers for /models/:id
    getOneCar = async (id) => {
        try {
            this.loading = true
            const docRef = doc(db, 'vehiclemodel', id)
            const oneCar = await getDoc(docRef)
            this.specificModel = { id: docRef.id, ...oneCar.data() }
            const makeData = await getDoc(this.specificModel.makeId)
            this.specificModel.makeId = makeData.data()
            this.loading = false
        } catch (err) {
            console.log(err)
            this.error = err.message
        }
    }

    // updates a document in the database
    updateOneCar = async (id, newYear) => {
        try {
            const docRef = doc(db, 'vehiclemodel', id)
            await updateDoc(docRef, { productionStart: parseInt(newYear) })
        } catch (err) {
            console.log(err)
            this.error = err.message
        }
    }

    // toggles the editing state for a models production start year
    toggleEditing() {
        this.editing = !this.editing
    }
    // filters fetched cars by manufacturer
    getAllCarsByManufacturer(manufacturer) {
        return new Promise(resolve => {
            setTimeout(action(() => {
                this.filteredModels = this.models.filter(model => model.makeId.abbreviation == manufacturer)
                resolve()
                this.timeout = 0
            }), this.timeout)
        })
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
    // sets the current page the user is viewing and the cars that he sees on that page (dependent on whether the cars have been filtered or not)
    setCurrentPage(pageNumber) {
        if (!this.filtering) {
            this.currentPage = pageNumber
            this.currentCars = sliceArray(this.models, this.currentPage, this.carsPerPage)
        } else {
            this.currentPage = pageNumber
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
        }
    }
    // sets the number of cars the user sees per page, the total amount of pages, brings back the user to page 1 and determines which cars to show on page 1 dependent on whether we are filtering models to include just some or all
    setCarsPerPage(number) {
        if (!this.filtering) {
            this.carsPerPage = number
            this.setCurrentPage(1)
            this.totalPages = Math.ceil(this.models?.length / this.carsPerPage)
        } else {
            this.carsPerPage = number
            this.setCurrentPage(1)
            this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
        }
    }
    // sets the filtering state to true, displays the name of the category by which the user is filtering, filters models to only include the ones by a certain manufacturer, then depending on how many of them there are and how many cars we are showing per page (which is determined in the function above), sets the total number of pages, brings back the user to page 1 and - if a sorting value is selected, sorts the (un)filtered models
    filterModelsByManufacturer(param) {
        if (param !== 'All') {
            this.filtering = true
            this.filterCategory = param
            this.filteredModels = this.models.filter(model => model.makeId.abbreviation == param)
            this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
            this.setCurrentPage(1)
            if (this.selectValue !== '') {
                this.sortModels(this.selectValue)
            }
        } else {
            this.filtering = false
            this.filterCategory = 'All'
            this.totalPages = Math.ceil(this.models?.length / this.carsPerPage)
            this.setCurrentPage(1)
            if (this.selectValue !== '') {
                this.sortModels(this.selectValue)
            }
        }
    }
    // filterCarsByManufacturer(manufacturer) {
    //     this.filteredModels = this.models.filter(model => model.makeId.abbreviation == manufacturer)
    // }
    // 
    // sortModels2(param) {
    //     if (!this.filtering && param == "Oldest") {
    //         this.selectValue = param
    //         this.filteredModels = this.models.sort((a, b) => a.productionStart - b.productionStart)
    //         this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
    //         this.currentPage = 1
    //         this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
    //     } else if (!this.filtering && param == "Newest") {
    //         this.selectValue = param
    //         this.filteredModels = this.models.sort((a, b) => b.productionStart - a.productionStart)
    //         this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
    //         this.currentPage = 1
    //         this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
    //     } else if (this.filtering && param == "Oldest") {
    //         this.selectValue = param
    //         this.filteredModels = this.filteredModels.sort((a, b) => a.productionStart - b.productionStart)
    //         this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
    //         this.setCurrentPage(1)
    //     } else if (this.filtering && param == "Newest") {
    //         this.selectValue = param
    //         this.filteredModels = this.filteredModels.sort((a, b) => b.productionStart - a.productionStart)
    //         this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
    //         this.setCurrentPage(1)
    //     }
    // }

    sortModels(param) {
        if (!this.filtering) {
            switch (param) {
                case 'Oldest':
                    this.selectValue = param
                    this.filteredModels = this.models.sort((a, b) => a.productionStart - b.productionStart)
                    this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
                    this.currentPage = 1
                    this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
                    break;
                case 'Newest':
                    this.selectValue = param
                    this.filteredModels = this.models.sort((a, b) => b.productionStart - a.productionStart)
                    this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
                    this.currentPage = 1
                    this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
                    break;
            }
        } else if (this.filtering) {
            switch (param) {
                case 'Oldest':
                    this.selectValue = param
                    this.filteredModels = this.filteredModels.sort((a, b) => a.productionStart - b.productionStart)
                    this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
                    this.setCurrentPage(1)
                    break;
                case 'Newest':
                    this.selectValue = param
                    this.filteredModels = this.filteredModels.sort((a, b) => b.productionStart - a.productionStart)
                    this.totalPages = Math.ceil(this.filteredModels?.length / this.carsPerPage)
                    this.setCurrentPage(1)
            }
        }
    }

}

const CarsStore = new Cars();

export default CarsStore;
