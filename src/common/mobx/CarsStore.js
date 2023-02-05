import {
    observable,
    computed,
    action,
    when,
    autorun,
    makeAutoObservable,
    runInAction
} from "mobx";
import { observer, Provider, inject } from "mobx-react";
import { db, collection, getDocs, getDoc, doc, updateDoc } from '../firebase/config'

class Cars {
    models = []
    makes = []
    loading = true
    filteredModels = []

    constructor() {
        makeAutoObservable(this)
        this.getAllCarsAndManufacturers()
    }

    getAllCarsAndManufacturers = async () => {
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
            }, 1000)
        })
        this.loading = false
    }

    updateOneCar = (id, newYear) => {
        const docRef = doc(db, 'vehiclemodel', id)
        updateDoc(docRef, { productionStart: parseInt(newYear) })
    }

    filterCarsByManufacturer(manufacturer) {
        this.filteredModels = this.models.filter(model => model.makeId.abbreviation == manufacturer)
    }

}

const CarsStore = new Cars();


export default CarsStore;
