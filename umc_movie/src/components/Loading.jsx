import React from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
const Styleddiv = styled.div`
  width: 100vw;
  height: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Loading(loading) {
  return (
    <Styleddiv>
      <ClipLoader
        color="
        #d0d5d4
        "
        loading={loading}
        size={100}
      />
    </Styleddiv>
  );
}
