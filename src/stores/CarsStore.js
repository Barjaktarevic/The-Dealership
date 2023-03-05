import { makeAutoObservable } from "mobx";
import axios from 'axios'
import UtilsStore from "./UtilsStore";

const api = axios.create({ baseURL: 'https://the-dealership-api.onrender.com' })
// const api = axios.create({ baseURL: 'http://localhost:3000' }) //for development

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
            const res = await api.get(`/models?make=${this.searchParams.make}&page=${this.searchParams.page}&sort=${this.searchParams.sort}`)
            this.models = [...res.data]

            this.loading = false
        } catch (error) {
            this.error = error.response.data
        }
    }

    getMakes = async () => {
        try {
            this.loading = true
            const res = await api.get('/makes')
            this.makes = [...res.data]
            this.loading = false
        } catch (error) {
            this.error = error.response.data
        }
    }

    getAllModelsByMake = async (abbrev) => {
        try {
            this.loading = true
            const res = await api.get(`/makes/${abbrev}`)
            this.modelsByMake = [...res.data]
            this.loading = false
        } catch (error) {
            this.error = error.response.data
        }
    }

    getOneModel = async (id) => {
        try {
            this.loading = true
            const res = await api.get(`/models/${id}`)
            this.specificModel = res.data
            this.loading = false
        } catch (error) {
            this.error = error.response.data
        }
    }

    updateModel = async (id, model) => {
        try {
            this.loading = true
            const data = await api.put(`/models/${id}`, model)
            this.loading = false
            return data
        } catch (error) {
            this.error = error.response.data
        } finally {
            await this.getOneModel(id)
            const inLocalStorage = UtilsStore.localStorage.some(e => e._id === CarsStore.specificModel._id)
            if (inLocalStorage) {
                UtilsStore.removeFromLocalStorage(id)
                UtilsStore.addToLocalStorage()
            }
        }
    }


    addModel = async (newModel) => {
        try {
            this.loading = true
            const data = await api.post('/models', newModel)
            this.loading = false
            return data
        } catch (error) {
            this.error = error.response.data
            this.loading = false
        }
    }

    deleteModel = async (id) => {
        try {
            this.loading = true
            const data = await api.delete(`/models/${id}`)
            this.loading = false
            return data
        } catch (error) {
            this.error = error.response.data
        } finally {
            UtilsStore.removeFromLocalStorage(id)
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
