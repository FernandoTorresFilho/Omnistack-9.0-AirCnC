import React, { useState, useMemo } from "react";
import api from "../../services/api";

import camera from "../../assets/camera.svg";
import "./styles.css";

export default function NewSpot({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState("");
    const [techs, setTechs] = useState("");
    const [price, setPrice] = useState("");

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem("user");

        data.append("thumbnail", thumbnail);
        data.append("company", company);
        data.append("techs", techs);
        data.append("price", price);

        await api.post("/spots", data, {
            headers: { user_id }
        });

        history.push("/dashboard");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label
                    id="thumbnail"
                    style={{ backgroundImage: `url(${preview})` }}
                    className={thumbnail ? "has-thumbnail" : ""}
                >
                    <input
                        type="file"
                        accept=".jpg, .png"
                        onChange={event => setThumbnail(event.target.files[0])}
                    />
                    <img src={camera} alt="Select img" />
                </label>

                <label htmlFor="company">Company *</label>
                <input
                    type="text"
                    id="company"
                    placeholder="Your company name"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />

                <label htmlFor="techs">
                    Technologies * <span>(Comma separated)</span>
                </label>
                <input
                    type="text"
                    id="techs"
                    placeholder="What technologies do you use?"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                />

                <label htmlFor="price">
                    Daily price * <span>(Blank for free)</span>
                </label>
                <input
                    type="text"
                    id="price"
                    placeholder="Value charged per day"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />

                <button type="submit" className="btn">
                    Register spot
                </button>
            </form>
        </>
    );
}
