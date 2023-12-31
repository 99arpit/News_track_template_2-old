import axios from "axios";
import React, { useRef } from "react";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import TopbarStart from "./TopbarStart";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SingleNews from "./SingleNews";
import '../App.css'
import Header from "./Header";
function ViewNews() {
    let location = useLocation();
    // console.log(location);
    const { id, newsId } = useParams();
    const agencyDetails = useRef(null);
    const [prop, setProp] = useState(null);
    const [render, setRender] = useState(false);

    const fetchAgencyData = async () => {
        try {
            const response = await axios.get(
                `http://174.138.101.222:8080/${id}/get-publication-details`
            );
            agencyDetails.current = response.data.data[0];
            setRender(true);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchArticleData = async () => {
        try {
            const response = await axios.get(
                `http://174.138.101.222:8080/${newsId}/get-post-news`
            );
            console.log(response);
            setProp(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (location.state === null) {
            fetchAgencyData();
            fetchArticleData();
        } else {
            agencyDetails.current = location.state.agencyDetails;
            setProp(location?.state?.item);
            setRender(true);
        }
    }, [location, id]);

    return (
        <div className="centre">
            <Header />
            {<TopbarStart page_name={"Detailed_News_Page"} />}
            {render && <Navigation page_name={"Detailed_News_Page"} agencyDetails={agencyDetails.current} />}
            {prop && <SingleNews prop={prop} />}
            {render && <Footer page_name={"Categories_Page"} agencyDetails={agencyDetails.current} />}
        </div>
    )
}

export default ViewNews