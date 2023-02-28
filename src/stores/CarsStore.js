import { makeAutoObservable } from "mobx";
import axios from 'axios'

class Cars {

    makes = []
    models = []
    modelsByMake = []
    searchParams = {}
    specificModel = null
    loading = false
    error = null

    constructor() {
        makeAutoObservable(this)
    }

    getModels = async () => {
        try {
            this.loading = true
            const res = await axios.get(`https://the-dealership-api.onrender.com/models?make=${this.searchParams.make}&page=${this.searchParams.page}&sort=${this.searchParams.sort}`)
            this.models = [...res.data]

            this.loading = false
        } catch (error) {
            this.error = error
        }
    }

    getMakes = async () => {
        try {
            this.loading = true
            const res = await axios.get('https://the-dealership-api.onrender.com/makes')
            this.makes = [...res.data]
            this.loading = false
        } catch (error) {
            this.error = error
        }
    }

    getAllModelsByMake = async (abbrev) => {
        try {
            this.loading = true
            const res = await axios.get(`https://the-dealership-api.onrender.com/models?make=${abbrev}`)
            this.modelsByMake = [...res.data]
            this.loading = false
        } catch (error) {
            this.error = error
        }
    }

    getOneModel = async (id) => {
        try {
            this.loading = true
            const res = await axios.get(`https://the-dealership-api.onrender.com/models/${id}`)
            this.specificModel = res.data
            this.loading = false
        } catch (error) {
            this.error = error
        }
    }

    updateOneModel = async (id, newYear) => {
        try {
            this.loading = true
            await axios.put(`https://the-dealership-api.onrender.com/models/${id}`, { productionStart: parseInt(newYear) })
            this.loading = false
        } catch (error) {
            this.error = error
        }
    }

    sortModels = (e) => {
        if (e === 'Newest') {
            this.searchParams = { ...this.searchParams, "page": 1, "sort": -1 }
        } else if (e === 'Oldest') {
            this.searchParams = { ...this.searchParams, "page": 1, "sort": 1 }
        } else {
            delete this.searchParams.sort
            this.searchParams = { ...this.searchParams, "page": 1 }
        }
        this.getModels()
    }

    filterModels = (e) => {
        this.searchParams = { ...this.searchParams, "page": 1, "make": e }
        this.getModels()
    }

    onPageChange = async (e) => {
        if (e === 'Previous page') {
            this.searchParams = { ...this.searchParams, "page": parseInt(this.searchParams.page) - 1 }
            if (parseInt(this.searchParams.page) < 1) this.searchParams = { ...this.searchParams, "page": 1 }
        } else if (e === 'Next page') {
            this.searchParams = { ...this.searchParams, "page": parseInt(this.searchParams.page) + 1 }
            await this.getModels()
            if (this.models.length < 1) {
                this.searchParams = { ...this.searchParams, "page": parseInt(this.searchParams.page) - 1 }
            }
        }
        await this.getModels()
    }
}

const CarsStore = new Cars();

export default CarsStore;
