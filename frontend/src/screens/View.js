import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const View = () => {
    const [tagData, setTagData] = useState(null)
    const [tags, setTags] = useState([]);


    useEffect(() => {
        try {
            const fetchTags = async () => {
                const { data } = await axios.get("http://localhost:5000/hashtags")
                // console.log(data);
                setTagData(data)
            }
            fetchTags()
        }
        catch (err) {
            alert(err)
        }
    }, [])

    useEffect(() => {

    }, [tagData])

    var tagInput = ""

    const removeTag = (i) => {
        const updateData = tagData.map((tag) => {
            tag.tags.map((y, j) => {
                console.log(i);
                if (j === i) {
                    console.log("press")
                    tag.tags.splice(i, 1)
                    console.log(tag.tags);
                    return tagData
                }
                else {
                    return tag.tags
                }
            })
        })
        setTagData(tagData)
        // return tagData.tag.tags
        // const newTags = [...tagData];
        // newTags.splice(i, 1);
        // // Call the defined function setTags which will replace tags with the new value.
        // setTagData(tagData.tag.tags);
    };

    const inputKeyDown = (e) => {
        const val = e.target.value;
        console.log(val);
        if (e.key === 'Enter' && val) {
            if (tagData.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTagData([...tagData, val]);
            tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tagData.length - 1);
        }
    };
    /////////////////

    const updateTitle = (id, newTitle) => {
        const updateData = tagData.map((tag) => {
            if (tag._id === id) {
                tag.title = newTitle
                return tag
            } else {
                return tag
            }
        })
        setTagData(updateData)
    }

    const setNewData = async (id, newTitle) => {
        try {
            const response = await axios.put("http://localhost:5000/hashtags/update", ({ id: id, newTitle: newTitle }))
            // console.log(response.data);
            if (response.data === "data updated") {
                const filterData = tagData.map((tag) => {
                    if (tag._id === id) {
                        tag.title = newTitle
                        return tag
                    } else {
                        return tag
                    }

                })
                setTagData(filterData)
                alert("Group Data Updated !")
            }
        }
        catch (err) {
            alert(err)
        }
    }

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/hashtags/delete/${id}`)
            console.log(response.data);
            if (response.data === "deleted") {
                const filterData = tagData.filter((tag) => {
                    if (tag._id !== id) {
                        return tag
                    }
                })
                setTagData(filterData)
            }
        }
        catch (err) {
            alert(err)
        }
    }

    return (
        <div>
            <br></br>
            <br></br>
            <Link to={"/"} className="goto">Create New Group</Link>
            {tagData ? tagData.map((tag) => {
                return (
                    <div className="main-div" key={tag._id}>
                        <input className="titleInput" value={tag.title} onChange={((e) => updateTitle(tag._id, e.target.value))}></input>
                        <br></br>
                        <br></br>
                        <div>
                            <div className="input-tag">
                                <ul className="input-tag__tags">
                                    {tag.tags.map((y, i) => (
                                        <li key={i}>
                                            {y}
                                            <button type="button" onClick={() => { removeTag(i); }}>+</button>
                                        </li>
                                    ))}
                                    <li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown} ref={c => { tagInput = c }} /></li>
                                </ul>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <button onClick={() => setNewData(tag._id, tag.title)}>Submit Changes</button>
                        <br></br>
                        <br></br>
                        <button onClick={() => deleteItem(tag._id)}>Delete</button>
                        <br></br>
                        <br></br>
                    </div>
                )
            })
                : <h1>No data found...</h1>}
        </div>
    )
}

export default View
