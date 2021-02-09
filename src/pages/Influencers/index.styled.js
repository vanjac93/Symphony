import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem 3rem;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
`

export const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

export const HeaderDiv = styled.div`
display: flex;
justify-content: space-between;
padding: 10px 20px;
    .remaining {
    font-weight: bold;
    }
    .note {

    }
`

export const InfluencerCard = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    align-items: center;
    img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin: 10px;
    }
    span {
        display: block;
        margin: 10px;
    }
    .name {
        font-weight: bold;
    }
    .title {
        color: blueviolet;
        margin: 10px;
    }
    .follow {
        border-radius: 5px;
        padding: 10px;
        background-color: ${({following}) => following ? '#805AD5' : '#f2f2f2'};
    }

`