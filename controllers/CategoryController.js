import CategoryModel from "../models/CategoryModel.js";


// Create Category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // name validation
        if (!name) {
            return res.status(400).json({
                status: false,
                message: "Category Name is required!"
            });
        }

        // check for existing category
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                status: false,
                message: "Category already exists!"
            });
        }

        // description validation
        if (!description) {
            return res.status(400).json({
                status: false,
                message: "Category Description is required!"
            });
        }

        const newCategory = new CategoryModel({
            name,
            description
        });

        await newCategory.save();

        res.status(201).json({
            status: true,
            data: newCategory
        })
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


export {
    createCategory
}