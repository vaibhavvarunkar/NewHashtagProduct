import express from "express"
import Tag from "../model/tagModel.js"
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const hashtag = await Tag.find({})
        res.json(hashtag)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            err: err
        })
    }
})

router.get("/search", async (req, res) => {
    try {
        const q = req.query.q
        const tags = await Tag.find({
            $text: {
                $search: q
            }
        })
        // console.log(quotess)
        res.json(tags)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            err: err
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const hashtag = await Tag.findById(req.params.id)
        res.json(hashtag)
        console.log(hashtag);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: err
        })
    }
})

router.post("/insert", async (req, res) => {
    const title = req.body.title
    const tags = req.body.tags
    console.log(title);
    console.log(tags)


    try {
        Tag.create(req.body).then(data => {
            Tag.find({}).then(data1 => {
                return res.status(200).json({
                    message: 'Saved',
                    hashtagData: data1
                })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: err
        })
    }
})

router.put("/update", async (req, res) => {
    const newTitle = req.body.newTitle
    // const newTags = req.body.newTags
    const id = req.body.id


    try {
        const updatedData = await Tag.findById(id)
        updatedData.title = newTitle
        // updatedData.tags = newTags
        await updatedData.save()
        res.status(201).send("data updated")

    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: err
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        const deletedItem = await Tag.findByIdAndRemove(id).exec()
        res.status(201).send("deleted")
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
})






export default router