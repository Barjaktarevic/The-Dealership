import { action, makeAutoObservable } from "mobx";
import { db, collection, getDocs, getDoc, doc, updateDoc } from '../common/firebase/config'
import { sliceArray } from "../common/utils";
import axios from 'axios'

const CARS_PER_PAGE = 5

class Cars {
    // Data fetching state
    models = []
    makes = []
    loading = false
    timeout = 2750
    error = null

    // new state
    apimodels = []
    apimakes = []
    searchParams = {}

    // Updating one car & using local storage state
    specificModel = null

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
                this.currentCars = sliceArray(this.models, this.currentPage, this.carsPerPage)
                this.totalPages = Math.ceil(this.models?.length / this.carsPerPage)
            }), 1500)
        } catch (err) {
            console.log(err)
            this.error = err.message
        }
    }

    getAllModelsFromApi = async () => {
        this.loading = true
        const res = await axios.get(`https://the-dealership-api.onrender.com/models?make=${this.searchParams.make}&page=${this.searchParams.page}&sort=${this.searchParams.sort}`)
        this.loading = false
        this.apimodels = [...res.data]

    }

    getAllMakesFromApi = async () => {
        this.loading = true
        const res = await axios.get('https://the-dealership-api.onrender.com/makes')
        this.apimakes = [...res.data]
        this.loading = false
    }

    getAllCarsByManufacturerFromApi = async (abbrev) => {
        this.loading = true
        const res = await axios.get(`https://the-dealership-api.onrender.com/models?make=${abbrev}`)
        this.filteredModelsFromApi = [...res.data]
        this.loading = false
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

    // gets all cars by a manufacturer
    getAllCarsByManufacturer(manufacturer) {
        this.loading = true
        return new Promise(resolve => {
            setTimeout(action(() => {
                this.filteredModels = undefined
                this.filteredModels = this.models.filter(model => model.makeId.abbreviation == manufacturer)
                resolve()
                this.timeout = 0
                this.loading = false
            }), this.timeout)
        })
    }

    // sets the current page the user is viewing and the cars that are visible
    setCurrentPage(pageNumber) {
        if (!this.filtering) {
            this.currentPage = pageNumber
            this.currentCars = sliceArray(this.models, this.currentPage, this.carsPerPage)
        } else {
            this.currentPage = pageNumber
            this.currentCars = sliceArray(this.filteredModels, this.currentPage, this.carsPerPage)
        }
    }
    // sets how many cars will be displayed per page and returns to page 1 while retaining filters
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
    // filters model by manufacturer and returns to page 1 while retaining filters
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
    // sorts models and returns to page 1 while retaining filters
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
