import styles from './App.module.css'
import dollar from "../images/icon-dollar.svg"
import person from "../images/icon-person.svg"
import { useState , useEffect } from 'react'


function App() {
  const [ showError, setShowError ] = useState({
    billError: false,
    tipError: false,
    numberError: false
  })

  const [numbers, setNumbers] = useState ({
    bill: "",
    tip: "",
    number: "",
    selectedRadioTip: null
  })
  
  const [results, setResults] = useState ({
    tip_per_person: "0.00",
    total_per_person: "0.00"
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        const isBillValid = numbers.bill !== "";
        const isTipValid = numbers.selectedRadioTip !== null || numbers.tip !== "";
        const isNumberValid = numbers.number !== "";

        setShowError({
          billError: !isBillValid,
          tipError: !isTipValid,
          numberError: !isNumberValid,
        });

        if (isBillValid && isTipValid && isNumberValid) {
          const billQ = Number(numbers.bill)
          const tipQ = numbers.selectedRadioTip !== null ? Number(numbers.selectedRadioTip) : Number(numbers.tip)
          const numberQ = Number(numbers.number)
          const tipAmount = billQ* (tipQ/100)
          const tip_per_person = (tipAmount / numberQ).toFixed(2)
          const total_per_person = ((billQ + tipAmount) / numberQ).toFixed(2)
          setResults({
            tip_per_person: tip_per_person,
            total_per_person: total_per_person
          })
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numbers]);

  const handleBillChange = (e) => {
    setNumbers((prev) => ({
      ...prev,
      bill: e.target.value 
    }));
  };

  const handleRadioChange = (e) => {
    setNumbers((prev) => ({
      ...prev,
      selectedRadioTip: e.target.value,
      tip : ""
    }));
  };

  const handleCustomChange = (e) => {
    setNumbers((prev) => ({
      ...prev,
      tip: e.target.value,
      selectedRadioTip : null
    }));
  };

  const handleNumberChange = (e) => {
    setNumbers((prev) => ({
      ...prev,
      number: e.target.value 
    }));
  };

  const handleReset = () => {
    setShowError({
      billError: false,
      tipError: false,
      numberError: false
    })

    setNumbers ({
      bill: "",
      tip: "",
      number: "",
      selectedRadioTip: null
    })
    
    setResults({
      tip_per_person: "0.00",
      total_per_person: "0.00"
    })
  }
  return (
    <div className={styles.mainElement}>
      <div className={styles.leftPart}>
        <div className={styles.inputDiv}>
          <div className={styles.labelWarningDiv}>
            <label htmlFor="Bill" className={styles.label}>
              Bill
            </label>
            {showError.billError && <p className={styles.warnPara}>
              Can't be zero
            </p>}
          </div>
          <div className={styles.relative}>
            <input 
              type="number" 
              className={`${styles.bigInputs} ${showError.billError ? styles.warnInput : ""}`} 
              name='Bill'  
              placeholder='0'
              value={numbers.bill}
              onChange={handleBillChange}
            />
            <div className={styles.unit}>
              <img src={dollar} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.inputDiv}>
          <div className={styles.labelWarningDiv}>
            <label htmlFor="" className={styles.label}>
              Select Tip %
            </label>
            {showError.tipError && 
            <p className={styles.warnPara}>
              Can't be zero
            </p>}
          </div>
          <div className={styles.inputsGrid}>
            {[5, 10, 15, 25, 50].map((value) => (
              <label key={value} className={styles.option}>
                <input
                  type="radio"
                  name="tip"
                  value={value}
                  checked={numbers.selectedRadioTip === String(value)}
                  onChange={handleRadioChange}
                />
                <p className={styles.customRadio}>{value}%</p>
              </label>
            ))}
            <div>
              <input 
                type="number" 
                name='tip' 
                className={`${styles.customInput} ${showError.tipError ? styles.warnInput : ""}`} 
                placeholder='Custom'
                value={numbers.tip}
                onChange={handleCustomChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.inputDiv}>
          <div className={styles.labelWarningDiv}>
            <label htmlFor="Number" className={styles.label}>
              Number of People
            </label>
            {showError.numberError && <p className={styles.warnPara}>
              Can't be zero
            </p>}
          </div>
          <div className={styles.relative}>
            <input 
              type="number" 
              className={`${styles.bigInputs} ${showError.numberError ? styles.warnInput : ""}`}  
              name='Number' 
              placeholder='0'
              value={numbers.number}
              onChange={handleNumberChange}
            />
            <div className={styles.unit}>
              <img src={person} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.outputDiv}>
          <div className={styles.innerOutput}>
            <div>
              <p className={styles.amount}>
                Tip Amount
              </p>
              <p className={styles.person}>
                / person
              </p>
            </div>
            <p className={styles.output}>${results.tip_per_person}</p>
          </div>
          <div className={styles.innerOutput}>
            <div>
              <p className={styles.amount}>
                Total
              </p>
              <p className={styles.person}>
                / person
              </p>
            </div>            
            <p className={styles.output}>${results.total_per_person}</p>
          </div>
        </div>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
