import styled, { css } from 'styled-components'

export const StyledNavItem = styled.div`
    margin: 10px;
    border-radius: 5px;
    display: flex;
    width: 50%;
    background-color: ${({active}) => active && '#f2f2f2'};
    button {
        width: 100%;
        padding: 10px;
            span {
                ${({active}) => active && css` font-weight: bold;`}
                margin-left: 20px;
            }
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
            :hover {
                ${({active}) => !active && css` background-color: #f2f2f2;`}
                cursor: pointer;
            }
        }
`


export const NewsContainer = styled.div`
    padding: 20px;
    display: flex;
    h3 {
        text-align: center;
    }

    .share {
        padding: 10px;
        border-radius: 10px;
        background-color: #f2f2f2;
        display: flex;
        img {
            flex: 0;
            border-radius: 50%;
            ${({theme: {news:{posts:{post:{dimensions}}}}}) => css`
                    width: ${dimensions}px;
                    height: ${dimensions}px;
                `}
        }
        input {
            background: url('public/assets/images/news-image.svg') no-repeat;
            background-position: 98% 50%;
            padding: 0 10px;
            padding-right: 30px;
            background-size: 20px;
            flex: 2;
            border-radius: 5px;
            background-color: white;
            margin: 0 10px;
        }
        button {

        }
    }


    .navbar {
        flex: 1;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .logo {
            /* margin-left: auto; */
            /* margin-right: 20px; */
            height: 50px;
            width: 50px;
        }
    }
    .feed {
        flex: 2;
        .pagination {
            width: 50%;
            margin: auto;
            border: 1px solid #f2f2f2;
            display: flex;
            text-align: center;
            .active {
                background-color: #f2f2f2;
            }
            li {
                border-radius: 5px;
                margin: 10px;
                padding: 10px; 
                :hover {
        background-color: aliceblue;
        cursor: pointer;
    }

            }
            .break-me {
                background-color: aliceblue;
            }
        }
    }
`

export const Post = styled.div`
    border-radius: 5px;
   margin: 30px;
   border-left: 2px solid #f2f2f2;
   position: relative;
   height: 150px;
   .header {
       margin-bottom: 10px;
       display: flex;
       justify-content: space-between;
       .info {
           display: flex;
           align-items: center;
            .avatar {
                position: absolute;
                transform: translateX(-50%);
                border-radius: 50%;
                ${({theme: {news:{posts:{post:{dimensions}}}}}) => css`
                    width: ${dimensions}px;
                    height: ${dimensions}px;
                `}
            }
            .name {
                font-weight: bold;
                margin-left: ${({theme: {news:{posts:{post:{dimensions}}}}}) => dimensions}px;
            }
            .username {
                margin-left: 20px;
                color:#718096;
            }
       }
       .created-on {
        color:#718096;
       }
   }
   .content {
       height: 80%;
       padding: 10px;
       display: flex;
       justify-content: space-between;
       flex-direction: column;
       .reaction {

       }
   }
`