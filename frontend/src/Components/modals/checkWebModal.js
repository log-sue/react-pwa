import {Button, Modal} from "react-bootstrap";

function CheckWebModal({show, handleModal1, handleModal2 } ){

    console.log(show)

    return(
        <Modal show={show} data-backdrop='static' data-keyboard='false'>
            <Modal.Header>
                <Modal.Title>Download App</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Download the app and enjoy a better experience.</p>
                <div className="d-grid gap-2">
                    <Button variant={"primary"} size="lg" onClick={handleModal1}>Install App</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"link"} onClick={handleModal2}>Continue to the web</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CheckWebModal;