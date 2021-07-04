// import { set } from 'mongoose'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import cut from "../images/cut.svg"
import "../css/Slider.css"

const Slider = (props) => {
    console.log(props);
    // const [btn, setBtn] = useState(false)
    // const [drop, setDrop] = useState(false)
    const [tagData, setTagData] = useState(null)
    const [tags, setTags] = useState([]);
    const [edit, setEdit] = useState(false)
    const [result, setResult] = useState([])
    const [refresh, setRefresh] = useState({})
    const displaybtn = (index) => {
        const res3 = tagData.map((tag, i) => {
            if (i === index) {
                tag.flag2 = true
                return tag
            }
            else {
                tag.flag2 = false
                return tag
            }
        })
        setTagData(res3)
    }
    const dropdown = (index) => {
        const res2 = tagData.map((tag, i) => {
            if (i === index) {
                tag.flag = true
                return tag
            }
            else {
                tag.flag = false
                return tag
            }
        })
        setTagData(res2)
    }




    useEffect(() => {
        try {
            const fetchTags = async () => {
                const { data } = await axios.get("http://localhost:5000/hashtags")
                // console.log(data);
                // setTagData(data)
                const res = data.map((dat) => {
                    dat.flag = false
                    dat.flag2 = false
                    return dat
                })
                setTagData(res)
            }
            fetchTags()
        }
        catch (err) {
            alert(err)
        }

    }, [])

    useEffect(() => {

    }, [tagData])

    // setTagData(props.data)
    console.log(tagData);

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


    const copyData = (data) => {
        var data2 = data.toString()
        var data3 = data2.replace(/,/g, ' ')
        // var newData = ""
        // data = data.split(",")
        /* Get the text field */
        var input = document.getElementById("copy");
        // input.type = "text"
        input.value = data3

        /* Select the text field */
        input.select();
        // input.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        // document.execCommand("copy");
        var successful = document.execCommand('copy');
        console.log(successful);
        input.remove()
    }

    const editData = async (id) => {
        setEdit(true)
        try {
            const { data } = await axios.get(`http://localhost:5000/hashtags/${id}`)
            console.log("run");
            console.log(data.title);
            result.push(data)
            setRefresh({})
        }
        catch (err) {
            alert(err)
        }
    }

    const setNewData = async (id, newTitle) => {
        try {
            const response = await axios.put("http://localhost:5000/hashtags/update", ({ id: id, newTitle: newTitle }))
            // console.log(response.data);
            if (response.data === "data updated") {
                const filterData = result.map((tag) => {
                    if (tag._id === id) {
                        tag.title = newTitle
                        return tag
                    } else {
                        return tag
                    }

                })
                setResult(filterData)
                alert("Group Data Updated !")
            }
        }
        catch (err) {
            alert(err)
        }
    }

    const updateTitle = (id, newTitle) => {
        const updateData = result.map((tag) => {
            if (tag._id === id) {
                tag.title = newTitle
                return tag
            } else {
                return tag
            }
        })
        console.log(updateData);
    }


    var tagInput = ""

    const removeTag = (i, id) => {
        console.log(i);
        const updateData = result.map((tag) => {
            if (tag._id === id) {
                tag.tags.map((y, j) => {
                    console.log(i);
                    if (j === i) {
                        console.log("press")
                        tag.tags.splice(i, 1)
                        console.log(tag.tags);
                        return result
                    }
                    else {
                        return tag.tags
                    }
                })
            }
        })
        setResult(result)
        // return tagData.tag.tags
        // const newTags = [...tagData];
        // newTags.splice(i, 1);
        // // Call the defined function setTags which will replace tags with the new value.
        // setTagData(tagData.tag.tags);
    };

    const inputKeyDown = (e, id, i) => {
        const val = e.target.value;
        console.log(val);
        if (e.key === 'Enter' && val) {
            if (result.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setResult([...result, val]);
        } else if (e.key === 'Backspace' && !val) {
            removeTag(i = -1, id);
            console.log(id);
        }
    };

    return (
        <>
            {
                edit ?
                    <>
                        {result.length ? result.map((tag) => {
                            console.log(tag)
                            return (
                                <div className="input" key={tag._id}>
                                    <div className="input-box">
                                        <h1>Update #Tag group <span><img onClick={() => setEdit(!edit)} style={{ cursor: "pointer" }} src={cut}></img></span></h1>
                                        <input className="titleInput" defaultValue={tag.title} onChange={((e) => updateTitle(tag._id, e.target.value))}></input>
                                        <button className="save-btn" onClick={() => setNewData(tag._id, tag.title)}>Save</button>
                                    </div>
                                    <div>
                                        <div className="input-tag">
                                            <ul className="input-tag__tags">
                                                {tag.tags.map((y, i) => (
                                                    <li key={tag}>
                                                        {y}
                                                        <button type="button" onClick={() => { removeTag(i, tag._id); }}>+</button>
                                                    </li>
                                                ))}
                                                <li className="input-tag__tags__input"><input placeholder="Enter hashtags like #love" type="text" onKeyDown={(e) => inputKeyDown(e, tag._id)} ref={c => { tagInput = c }} /></li>
                                                <p style={{ position: "relative", top: 100 }}>{tag.tags.length}</p>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                            : <h1>No data found...</h1>}
                    </>
                    :
                    <></>
            }
            <div className="slider-outer-div">
                <div className="slider-header">
                    <h2 className="heading">{props.searchData.length ? "Search Results" : "Saved"}</h2>
                    <h2 className="heading-2"><span><i class="fas fa-angle-left"></i></span> <span></span> <span><i class="fas fa-angle-right"></i> </span><span>See all</span></h2>
                </div>
                <div className="main-slider">
                    {tagData ? tagData.map((tag, i) => {
                        return (
                            <div div className="outer-border" onClick={() => displaybtn(i)} >
                                <input id="copy"></input>
                                <div className={tag.flag ? "inner-border" : "inner-border-act"}>
                                    {tag.flag2 ? <span className={tag.flag ? "menu-hover" : "menu"} onClick={() => dropdown(i)}><i class="fas fa-ellipsis-h"></i></span> : <></>}
                                    {tag.flag ?
                                        <div className="dropdown">
                                            <div onClick={() => editData(tag._id)}><span className="blue"><i class="far fa-edit"></i></span>Edit</div>
                                            <div onClick={() => copyData(tag.tags)}><span className="yellow"><i class="far fa-copy"></i></span>Copy</div>
                                            <div onClick={() => deleteItem(tag._id)}><span className="red"><i class="fas fa-times"></i></span>Delete</div>
                                        </div>
                                        : <></>
                                    }
                                </div>
                                <h4>{tag.title}</h4>
                            </div>
                        )
                    }
                    )
                        : <></>
                    }

                </div>
            </div>
        </>
    )
}

export default Slider
