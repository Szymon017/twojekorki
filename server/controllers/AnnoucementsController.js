import Annoucement from "../models/Annoucement.js";

const getAllAnnoucements = async (req, res) => {
    const page = req.query.p || 0; 
    const annoucementsPerPage = 15;

    try {
        const annoucements = await Annoucement.find({}).skip(page*annoucementsPerPage).limit(annoucementsPerPage);
        res.status(200).json({
            status: 'Successfully got an annoucement',
            results: annoucements.length,
            data: {
                annoucements
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed to get all annoucements",
            message: error
        })
    }
}

const getAnnoucementById = async (req, res) => {
    try {
        const annoucement = await Annoucement.findOne({ _id: req.params.id });
        res.status(200).json({
            status: 'Successfully got all annoucements',
            results: annoucement.length,
            data: {
                annoucement
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed to get an annoucement",
            message: error.message
        })
    }
}

const addNewAnnoucement = async (req, res) => {
    const {title, description, author, price, category, option, date} = req.body;

    try {
        const newAnnoucement = await Annoucement.create({
            title, description, author, price, category, option, date
        })
        res.status(200).json({
            status: 'Successfully created an annoucement',
            data: newAnnoucement
        });
    } catch (error) {
        res.send(500).json({
            status: 'Failed to create an annoucement',
            message: error
        })
    }
}

const deleteAnnoucement = async (req, res) => {
    try {
        const result = await Annoucement.findByIdAndDelete({_id: req.params.id})
        if(!result) throw Error("No annoucement found!")
        res.status(201).json({
            status: 'Successfully deleted annoucement',
            data: null
          });
    } catch (error) {
        res.status(409).json({
            status: 'Failed to delete an annoucement',
            message: error.message
        });
    }
}

const updateAnnoucement = async (req, res) => {
    try {
        const newAnnoucement = await Annoucement.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        });
        if(!newAnnoucement) throw Error("No annoucement found!")
        res.status(200).json({
            status: 'Succesfully updated an annoucement',
            data: newAnnoucement
          })
    } catch (error) {
        res.status(500).json({
            status: 'Failed to update an annoucement',
            message: error.message
          });
    }
}

export {
    getAllAnnoucements,
    getAnnoucementById,
    addNewAnnoucement,
    updateAnnoucement,
    deleteAnnoucement
}