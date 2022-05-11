import React from 'react'
import styled from "styled-components"

import { ImCross } from "react-icons/im"

const Cross = ({ Clicked }) => {
    return (<Container onClick={() => Clicked()}>
        <ImCross />
    </Container>);
}

const Container = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -7px;
    right: 5px;
    background: var(--red);
    z-index: 1000000;
`

export default Cross;