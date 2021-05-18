import styled from 'styled-components';
import CloseBtn from '../components/Buttons/CloseBtn';


const Background = styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;

    background-color: rgba(0,0,0, 0.8);

    z-index: 100;
    display: none;

    &.visible {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    padding: 60px;

    z-index: 200;
    background-color: white;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        min-width: 30%;
        width: max-content;
        min-height: 300px;
    }
`;

const ModalContainer = ({ children, name }) => {

    const closeWindow = () => {
        let item = document.querySelector(`.${name}`)
        item.classList.remove('visible');
    };

    return(
        <Background className={name} onClick={closeWindow}>
            <Container>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
                {children}
            </Container>
        </Background>
    )
}

export default ModalContainer;