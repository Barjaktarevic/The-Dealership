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
        this.loading = true
        const res = await axios.get(`https://the-dealership-api.onrender.com/models?make=${this.searchParams.make}&page=${this.searchParams.page}&sort=${this.searchParams.sort}`)
        this.models = [...res.data]
        this.loading = false
    }

    getMakes = async () => {
        this.loading = true
        const res = await axios.get('https://the-dealership-api.onrender.com/makes')
        this.makes = [...res.data]
        this.loading = false
    }

    getAllModelsByMake = async (abbrev) => {
        this.loading = true
        const res = await axios.get(`https://the-dealership-api.onrender.com/models?make=${abbrev}`)
        this.modelsByMake = [...res.data]
        this.loading = false
    }

    getOneModel = async (id) => {
        this.loading = true
        const res = await axios.get(`https://the-dealership-api.onrender.com/models/${id}`)
        this.specificModel = res.data
        this.loading = false
    }

    updateOneModel = async (id, newYear) => {
        this.loading = true
        await axios.put(`https://the-dealership-api.onrender.com/models/${id}`, { productionStart: parseInt(newYear) })
        this.loading = false
    }

}

const CarsStore = new Cars();

export default CarsStore;
