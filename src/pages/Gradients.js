import React from 'react'

import Breadcrumb from "../components/Breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToBottom from "../components/ScrollToBottom";
import GradientList from '../components/GradientList';

const Gradients = () => {
    return (
        <>
            <div>
                <Breadcrumb currentPage="gradient" />

                <div className="flex flex-wrap">
                    <GradientList />
                </div>
            </div>
            <ScrollToBottom />
            <ScrollToTop />
        </>
    )
}

export default Gradients
