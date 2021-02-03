const { errorHandler } = require('../helpers/dbErrorHandler');
const Tag = require('../models/tag');
const slugify = require('slugify');

exports.create = (req,res) => {

    const {name} = req.body;
    let slug = slugify(name).toLowerCase();

    let tag = new Tag({name,slug});

    tag.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "tag created successfully"
        })
    })
}

exports.list = (req,res) => {

    Tag.find({}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    })
}

exports.read = (req,res) => {
    const slug = req.params.slug.toLowerCase();

    Tag.findOne({slug}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    })
}

exports.remove = (req,res) => {
    const slug = req.params.slug.toLowerCase();

    Tag.findOneAndDelete({slug}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "tag removed successfully"
        });
    })
}