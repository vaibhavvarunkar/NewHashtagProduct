import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../css/home.css"
import logo from "../images/Logo.svg"
import user from "../images/user.svg"
import search from "../images/search.svg"
import { bold } from 'colors';
import cut from "../images/cut.svg"
// import Carousel from 'react-elastic-carousel'
import Slider from './Slider';


const Home = (props) => {
    const [count, setCount] = useState(2)
    const [input, setInput] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [refresh, setRefresh] = useState({})
    const [res, setRes] = useState([])
    const [searchRes, setSearchRes] = useState([])

    const handleKeyChange = (e) => {
        if (e.keyCode === 13) {
            searchFunc()
        }
    }
    ////input-react-tag
    const [tags, setTags] = React.useState([
        'Tags',
        'Input'
    ]);

    var tagInput = ""

    const removeTag = (i) => {
        if (count === 0) {
            setCount(0)
        }
        else {
            setCount(count - 1)
        }
        const newTags = [...tags];
        newTags.splice(i, 1);

        // Call the defined function setTags which will replace tags with the new value.
        setTags(newTags);
    };
    const [loadMore, setLoadMore] = useState(false)

    const inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            tagInput.value = null;
            setCount(count + 1)
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    };
    ///////////////////

    const searchFunc = () => {
        // setPageNumber(0)
        console.log("run");
        const fetchQueryTags = async () => {
            console.log("run");
            const { data } = await axios.get(`http://localhost:5000/hashtags/search/?q=${searchTerm}`)
            setSearchRes(data)
            console.log(data);
        }
        fetchQueryTags()
        setLoadMore(true)
    }

    const [title, setTitle] = useState("")



    const addToList = async () => {
        try {
            const res = await axios.post("http://localhost:5000/hashtags/insert", {
                title: title,
                tags: tags
            })
            console.log(res);
            setRes(res)
            alert("data Inserted.")
            setRefresh({})
        }
        catch (err) {
            alert(err)
        }
    }
    return (
        <div>
            <nav className="navbar">
                <div>
                    <img className="logo" src={logo}></img>
                </div>
                <div>
                    <img className="user-logo" src={user}></img>
                </div>
            </nav>
            <div className="header">
                <h2>Design is not just what it looks like and feels like. Design is how it works.</h2>
                <div className="searchBar">
                    <div className="logo-div">
                        <img className="search-logo" for="search" src={search}></img>
                    </div>
                    <input placeholder="Search topics and categories" value={searchTerm} onKeyDown={handleKeyChange} onChange={(e) => setSearchTerm(e.target.value)}></input>
                    <br></br>
                </div>
                <p><span style={{ fontWeight: 700 }}>Try This:<span className="span1">Marketing</span><span className="span2">Content</span></span></p>
            </div>
            <div className="create-btn">
                <button onClick={() => setInput(!input)}>Create A Group</button>
            </div>
            <br></br>
            <br></br>

            {
                input ?
                    <>
                        <div className="input">
                            <div className="input-box">
                                <h1>Create #Tag group <span><img onClick={() => setInput(!input)} style={{ cursor: "pointer" }} src={cut}></img></span></h1>
                                <input type="text" className="titleInput" onChange={((e) => setTitle(e.target.value))} placeholder="Enter group name" />
                                <button className="save-btn" onClick={addToList}>Save</button>
                            </div>
                            <div>
                                <div className="input-tag">
                                    <ul className="input-tag__tags">
                                        {tags.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <button type="button" onClick={() => { removeTag(i); }}>+</button>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input"><input placeholder="Enter hashtags like #love" type="text" onKeyDown={inputKeyDown} ref={c => { tagInput = c }} /></li>
                                        <p style={{ position: "relative", top: 100 }}>{count}</p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                    : null
            }

            <Slider data={res} searchData={searchRes} />

        </div >
    )
}

export default Home
