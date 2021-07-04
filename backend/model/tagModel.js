import mongoose from "mongoose"

// const singletagSchema = mongoose.Schema({ tag: { type: String, required: true } })
const tagSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            required: true
        }
    }
)

tagSchema.index({ "$**": "text" })

const Tag = mongoose.model("Tag", tagSchema)

export default Tag