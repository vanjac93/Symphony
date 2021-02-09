import styled, {css} from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    .img-container {
        flex-basis: 40%;
        position: relative;
        img {
            height: 100%;
            width: 100%;
        }

        h2 {
            color: white;
            position: absolute;
            top: 20px;
            left: 20px;
        }
    }
    .form-container {
        
        flex: 2;
        background-color: #EDF2F7;
        position: relative;
        .content {
            position: relative;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .logo {
                text-align: center;
                margin-bottom: 10px;
            }
        }
        form {    
            border-radius: 5px;
            border-top: 4px solid #9F7AEA;
            padding: 20px;
            background-color: white;
            h3 {
                text-align: center;
                margin: 20px 0px;
            }
            }
            .submit {
                .ui.button {
                    color: white;
                    background-color: #9F7AEA;
                    border-radius: 20px;
                }
            }
        }   
    }

`