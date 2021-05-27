import styled from 'styled-components';
import CloseBtn from '../components/Buttons/CloseBtn';


const Background = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;

    background-color: rgba(0,0,0, 0.8);
`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;
    display: none;
    z-index: 20;


    &.visible {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const Modal = styled.section`
    width: 100%;
    min-height: 100vh;
    padding: 60px;

    background-color: white;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 200;

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        min-width: 30%;
        width: max-content;
        min-height: 300px;
    }
`;

const ModalContainer = ({ children, name }) => {

    const closeWindow = (e) => {
        let item = document.querySelector(`.${name}`)
        item.classList.remove('visible');
    };

    return(
        <Container className={name}>
            <Background onClick={e => closeWindow(e)} />
            <Modal>
            <CloseBtn btnFunction={e => closeWindow(e)} icon={'/cancel.png'} />
                {children}
            </Modal>
       </Container>
    )
}

export default ModalContainer;