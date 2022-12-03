import React, { useState, useEffect } from 'react'

const q = [
    {
        id: "w1",
        quetion: "what is redux?",
        option: ["fun", "foo", "bar", "nahh"],
        answer: "fun"
    },
    {
        id: "w2",
        quetion: "what is html?",
        option: ["hypertext transfer protocol", "hypertext markup lang", "javascript", "none of above"],
        answer: "hypertext markup lang"
    },
    {
        id: "w3",
        quetion: "waht is css?",
        option: ["sass", "less", "cascade style sheets", "none of above"],
        answer: "cascade style sheets"
    },
    {
        id: "w4",
        quetion: "waht is Js?",
        option: ["JavaScript", "less", "TypeScript", "none of above"],
        answer: "JavaScript"
    },
    {
        id: "w5",
        quetion: "waht is variable?",
        option: ["Data Type", "IDK", "simple Value", "none of above"],
        answer: "IDK"
    }

]
export default function Test() {

    let correct, wrong, score;

    const [qIndex, setQIndex] = useState(0)
    const [selectedQuetion, setselectedQuetion] = useState({ ...q[0] })
    const [userAnswer, setuserAnswer] = useState()
    const [userResponse, setuserResponse] = useState([])
    const [show, setshow] = useState(false)
    const [bg, setbg] = useState()
    const [percentage, setpercentage] = useState()
    const handleNext = () => {
        setQIndex(pre => pre < q.length - 1 ? pre + 1 : pre)
    }
    const handleBack = () => {
        setQIndex(pre => pre > 0 ? pre - 1 : pre)
    }

    const calculateResult = () => {
        setshow(show === false ? true : false)
    }
    const handleChecked = item => {
        // const copyOfUserResponse = JSON.parse(JSON.stringify(userResponse))
        const found = userResponse && userResponse.findIndex(item => item.id === selectedQuetion.id)
        console.warn(found);
        if (found >= 0 && item === userResponse[found].uanswer) {
            // alert("found")
            return true
        } else {
            return false
        }
    }

    const handleProgress = () => {
        setpercentage((qIndex + 1) / q.length * 100)
        if (percentage < 35) {
            setbg("bg-danger")
        }
        else if (percentage < 67) {
            setbg("bg-warning")
        }
        else if (percentage >= 75) {
            setbg("bg-success")
        }
    }

    useEffect(() => {
        setselectedQuetion({ ...q[qIndex] })
        handleProgress()
    }, [qIndex, percentage])

    return <>
        {/* {JSON.stringify(selectedQuetion)} */}
        <div className="container-fluid">
            <br />

            <div className="row">
                <div className="col-sm-8 col-md-6 offset-md-3 offset-sm-2">
                    {
                        show && <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <h1><strong>Result!</strong> Your Statastics Are Below.</h1>
                            <h4><strong>Total Questions =</strong>  {q.length}</h4>
                            <h4><strong>Attempted Questions =</strong> {userResponse.length}</h4>
                            <h4><strong>Correct =</strong> {correct = userResponse.filter(item => item.answer === item.uanswer).length}</h4>
                            <h4><strong>Wrong =</strong> {wrong = userResponse.filter(item => item.answer !== item.uanswer).length}</h4>
                            <h4><strong>Score =</strong> {score = userResponse.filter(item => item.answer === item.uanswer).length}</h4>
                            <button onClick={e => setshow(false)} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    }
                    <div className="progress mb-3">
                        <div className={`progress-bar ${bg} progress-bar-striped progress-bar-animated`}
                            role="progressbar" aria-label="Animated striped example"
                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                            style={{ width: `${percentage}%` }}>{percentage}%</div>
                    </div>
                    <div className="card bg-transparent">
                        <div className="card-header text-light">
                            <h4>
                            {selectedQuetion.quetion}
                            </h4>
                            </div>
                        <div className="card-body">
                            {/* {JSON.stringify(userResponse)} */}
                            {
                                selectedQuetion.option.map((item, index) => <div key={item}>
                                    <div className="form-check">
                                        <input
                                            onChange={e => {
                                                setuserAnswer(e.target.value)
                                                setuserResponse(pre => {
                                                    const x = userResponse.findIndex(item => item.id === selectedQuetion.id)
                                                    if (x !== -1) {
                                                        const copyUserResponse = JSON.parse(JSON.stringify(userResponse))
                                                        copyUserResponse[x] = { ...copyUserResponse[x], uanswer: e.target.value }
                                                        // setuserResponse(copyUserResponse)
                                                        return copyUserResponse
                                                    } else {
                                                        return setuserResponse([...userResponse, { ...selectedQuetion, uanswer: e.target.value }])
                                                    }
                                                })
                                            }}
                                            type="radio"
                                            value={item}
                                            checked={handleChecked(item)}
                                            name={selectedQuetion.id}
                                            id={item}
                                            className='form-check-input' />
                                        <label className='text-light' htmlFor={item}>{item}</label>
                                    </div>
                                </div>)
                            }
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            {
                                (qIndex > 0) && <button
                                    onClick={handleBack}
                                    className='btn btn-sm'>
                                    Previouse
                                </button>
                            }

                            {
                                !(q.length - 1 === qIndex) && <button
                                    onClick={handleNext}
                                    className='btn btn-sm'>
                                    Next
                                </button>
                            }
                        </div>
                    </div>
                    <button
                        onClick={calculateResult}
                        className='btn submit-btn w-100 mt-3'>Submit Answer
                    </button>
                </div>
            </div>
        </div >
    </>
}
