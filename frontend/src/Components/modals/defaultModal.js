import {Button, Modal} from "react-bootstrap";

function DefaultModal({show, massage, handleModal} ){

    console.log(show)
    console.log(massage)

    return(
        <Modal show={show} onHide={handleModal}>
            <Modal.Header>
                <Modal.Title>Notice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{massage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"primary"} onClick={handleModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DefaultModal;