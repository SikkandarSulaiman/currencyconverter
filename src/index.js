import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const CurrencyMeter = ({
    side,
    currencyList,
    value,
    valueChange,
    currencyChange,
}) => {
    const select_tag_name = `${side}-currency-selection`;
    return (
        <>
            <select name={select_tag_name} onChange={currencyChange}>
                {Object.entries(currencyList).map(
                    ([currency_name, val_in_INR], i) => {
                        return (
                            <option value={currency_name} key={i}>
                                {currency_name}
                            </option>
                        );
                    }
                )}
            </select>
            <input type="number" value={value} onChange={valueChange} />
        </>
    );
};

function App() {
    const [inputCur, setInputCur] = useState("INR");
    const [inputVal, setInputVal] = useState("1");
    const [outputCur, setOutputCur] = useState("INR");
    const [outputVal, setOutputVal] = useState("1");
    const [currs, setCurrs] = useState({});

    useEffect(() => {
        fetch("https://open.er-api.com/v6/latest/INR")
            .then((res) => res.json())
            .then((res) => {
                console.log("res rates:", res.rates);
                setCurrs({ ...currs, ...res.rates });
            });
    }, []);

    const inputCurrencyChange = (e) => {
        setInputCur(e.target.value);
        let input_val_in_INR = inputVal / currs[e.target.value];
        setOutputVal(input_val_in_INR * currs[outputCur]);
    };

    const outputCurrencyChange = (e) => {
        setOutputCur(e.target.value);
        let input_val_in_INR = outputVal / currs[e.target.value];
        setInputVal(input_val_in_INR * currs[inputCur]);
    };

    const inputValueChange = (e) => {
        setInputVal(e.target.value);
        let input_val_in_INR = e.target.value / currs[inputCur];
        setOutputVal(input_val_in_INR * currs[outputCur]);
    };

    const ouputValueChange = (e) => {
        setOutputVal(e.target.value);
        let input_val_in_INR = e.target.value / currs[outputCur];
        setInputVal(input_val_in_INR * currs[inputCur]);
    };

    return (
        <div>
            <CurrencyMeter
                side="input"
                currencyList={currs}
                value={inputVal}
                valueChange={inputValueChange}
                currencyChange={inputCurrencyChange}
            />
            <CurrencyMeter
                side="output"
                currencyList={currs}
                value={outputVal}
                valueChange={ouputValueChange}
                currencyChange={outputCurrencyChange}
            />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

