import { Button, Modal } from "react-bootstrap";
import "./Calculator.css";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import CommonLoading from "../../../Common/CommonFunctions/CommonLoading";
import Draggable from "react-draggable";

function Calculator({ showCalculator, setShowCalculator, isMinimized, setIsMinimized }) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    const handleCloseModal = () => {

        console.log(showCalculator,'showCalculator');
        console.log(isMinimized,'isMinimized');
        setShowCalculator(false);
        // setIsMinimized(!isMinimized);
        setIsMinimized(false);
    };

    const handleMinimize = () => { 
        setIsMinimized(true);
        setShowCalculator(false);


    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (/[0-9+\-*/().%]/.test(e.key)) {
                setInput((prevInput) => prevInput + e.key);
            } else if (e.key === "Enter") {
                calculateResult();
            } else if (e.key === "Backspace") {
                setInput((prevInput) => prevInput.slice(0, -1));
            } else if (e.key === "Escape") {
                clearInput();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const calculateResult = () => {
        try {
            setResult(eval(input).toString());
        } catch {
            setResult("Error");
        }
    };

    const handleClick = (value) => {
        if (value === "=") {
            calculateResult();
        } else if (value === "CE") {
            clearInput();
        } else {
            setInput(input + value);
        }
    };

    const clearInput = () => {
        setInput("");
        setResult("");
    };

    return (
        <Modal
            size="md"
            show={showCalculator}
            centered
            aria-labelledby="example-modal-sizes-title-sm"
            backdrop={false}
            dialogClassName="modal-dialog"
            contentClassName="modal-contents"
        >
            <Draggable handle=".modal-headers">
                <div className={`draggable-container ${isMinimized ? 'minimized' : ''}`}>
                    <Modal.Header className="modal-headers">
                        <h4 className="tx-20 fw-bold mt-2">ক্যালকুলেটর</h4>
                        <div>
                            <Button
                                variant="none"
                                className="btn btn-sm btn-warning"
                                onClick={handleMinimize}
                            >
                                <i className="fas fa-window-minimize"></i>
                            </Button>
                            <Button
                                variant="none"
                                className="btn btn-sm btn-danger"
                                onClick={handleCloseModal}
                            >
                                <i className="fas fa-times"></i>
                            </Button>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {isLoading ? (
                            <div className="p-5 m-5 text-center text-danger">
                                <CommonLoading />
                            </div>
                        ) : (
                            <div className="calculator" ref={inputRef}>
                                <div className="calculator_display">
                                    <div>Ans = {result}</div>
                                    <div className="calculator_input">{input}</div>
                                </div>
                                <div className="calculator_buttons">
                                    {[
                                        "(",
                                        ")",
                                        "%",
                                        "CE",
                                        "7",
                                        "8",
                                        "9",
                                        "/",
                                        "4",
                                        "5",
                                        "6",
                                        "*",
                                        "1",
                                        "2",
                                        "3",
                                        "-",
                                        "0",
                                        ".",
                                        "=",
                                        "+",
                                    ].map((item) => (
                                        <button className="calculator_button" key={item} onClick={() => handleClick(item)}>
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                </div>
            </Draggable>
        </Modal>
    );
}

export default Calculator;
